import { useEffect, useState } from 'react'
import './App.css'

const TODO = {
  title: 'Finish HNG Stage 0 Task',
  description: 'Build a clean, accessible and testable todo card.',
  priority: 'High',
  status: 'In Progress',
  tags: ['work', 'urgent', 'frontend'],
  dueDateTime: '2026-04-16T18:00:00',
  dueDateText: 'April 16, 2026 18:00',
  completed: false,
}

function getTimeRemainingLabel(dueDate, nowInput = new Date()) {
  const now = new Date(nowInput)
  const msDifference = dueDate.getTime() - now.getTime()

  if (Math.abs(msDifference) <= 60000) {
    return 'Due now!'
  }

  if (now > dueDate) {
    const overdueHours = Math.max(
      1,
      Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60)),
    )

    return `Overdue by ${overdueHours} hour${overdueHours === 1 ? '' : 's'}`
  }

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfDueDay = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  )

  const dayDifference = Math.round(
    (startOfDueDay.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (dayDifference === 0) {
    return 'Due today'
  }

  if (dayDifference === 1) {
    return 'Due tomorrow'
  }

  return `Due in ${dayDifference} days`
}

function getTagTestId(tag) {
  if (tag === 'work') {
    return 'test-todo-tag-work'
  }

  if (tag === 'urgent') {
    return 'test-todo-tag-urgent'
  }

  return undefined
}

function App() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [nowTick, setNowTick] = useState(Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNowTick(Date.now())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const currentStatus = isCompleted ? 'Done' : TODO.status
  const timeRemaining = getTimeRemainingLabel(new Date(TODO.dueDateTime), nowTick)

  return (
    <main className="app-shell">
      <article className="todo-card" data-testid="test-todo-card" aria-label="Todo card">
        <header className="todo-header">
          <h2
            className={`todo-title ${isCompleted ? 'is-complete' : ''}`}
            data-testid="test-todo-title"
          >
            {TODO.title}
          </h2>
          <span className="priority-pill priority-high" data-testid="test-todo-priority">
            {TODO.priority}
          </span>
        </header>

        <p className="todo-description" data-testid="test-todo-description">
          {TODO.description}
        </p>

        <div className="todo-details">
          <p className="status-line">
            <span className="detail-label">Status:</span>{' '}
            <span data-testid="test-todo-status">{currentStatus}</span>
          </p>

          <p className="due-line">
            <span className="detail-label">Due date:</span>{' '}
            <time data-testid="test-todo-due-date" dateTime={TODO.dueDateTime}>
              {TODO.dueDateText}
            </time>
          </p>

          <time
            className="time-remaining"
            data-testid="test-todo-time-remaining"
            dateTime={TODO.dueDateTime}
            aria-live="polite"
          >
            {timeRemaining}
          </time>
        </div>

        <div className="toggle-row">
          <input
            id="todo-complete-toggle"
            type="checkbox"
            data-testid="test-todo-complete-toggle"
            checked={isCompleted}
            onChange={(event) => setIsCompleted(event.target.checked)}
            aria-label="Mark todo as complete"
          />
          <label htmlFor="todo-complete-toggle">Mark as complete</label>
        </div>

        <ul className="tags" data-testid="test-todo-tags" aria-label="Todo tags">
          {TODO.tags.map((tag) => (
            <li key={tag} data-testid={getTagTestId(tag)}>
              #{tag}
            </li>
          ))}
        </ul>

        <div className="actions">
          <button
            type="button"
            data-testid="test-todo-edit-button"
            onClick={() => console.log('edit clicked')}
            aria-label="Edit todo item"
          >
            Edit
          </button>
          <button
            type="button"
            data-testid="test-todo-delete-button"
            onClick={() => alert('delete clicked')}
            aria-label="Delete todo item"
          >
            Delete
          </button>
        </div>
      </article>
    </main>
  )
}

export default App
