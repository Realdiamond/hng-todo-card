import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const INITIAL_TASK = {
  title: 'Finish HNG Stage 1a Task',
  description:
    'Build a clean, accessible, and testable advanced todo card with editable fields, synchronized status controls, robust overdue handling, and responsive layout behavior that remains easy to use on both mobile and desktop screens without breaking semantic structure.',
  priority: 'High',
  status: 'In Progress',
  tags: ['work', 'urgent', 'frontend'],
  dueDateTime: '2026-12-20T18:00',
  completed: false,
}

const DESCRIPTION_COLLAPSE_THRESHOLD = 170

function pluralize(value, label) {
  return `${value} ${label}${value === 1 ? '' : 's'}`
}

function getCalendarDayDifference(targetDate, nowDate) {
  const startOfNow = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
  const startOfTarget = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  )

  return Math.round((startOfTarget - startOfNow) / (1000 * 60 * 60 * 24))
}

function formatDueDate(dateInput) {
  const date = new Date(dateInput)

  if (Number.isNaN(date.getTime())) {
    return String(dateInput)
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month} ${day}, ${year} ${hours}:${minutes}`
}

function getPriorityClass(priority) {
  if (priority === 'High') {
    return 'priority-high'
  }

  if (priority === 'Medium') {
    return 'priority-medium'
  }

  return 'priority-low'
}

function getStatusClass(status) {
  if (status === 'Done') {
    return 'status-done'
  }

  if (status === 'Pending') {
    return 'status-pending'
  }

  return 'status-in-progress'
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

function getTimeState(dueDate, nowTick, status) {
  if (status === 'Done') {
    return {
      label: 'Completed',
      isOverdue: false,
    }
  }

  if (Number.isNaN(dueDate.getTime())) {
    return {
      label: 'Invalid due date',
      isOverdue: false,
    }
  }

  const nowDate = new Date(nowTick)
  const differenceMs = dueDate.getTime() - nowTick
  const absoluteMs = Math.abs(differenceMs)

  if (absoluteMs <= 60000) {
    return {
      label: 'Due now!',
      isOverdue: false,
    }
  }

  if (differenceMs > 0) {
    const dayDifference = getCalendarDayDifference(dueDate, nowDate)

    if (dayDifference > 1) {
      return {
        label: `Due in ${pluralize(dayDifference, 'day')}`,
        isOverdue: false,
      }
    }

    if (dayDifference === 1) {
      return {
        label: 'Due tomorrow',
        isOverdue: false,
      }
    }

    const hours = Math.ceil(differenceMs / (1000 * 60 * 60))

    if (hours >= 1) {
      return {
        label: `Due in ${pluralize(hours, 'hour')}`,
        isOverdue: false,
      }
    }

    const minutes = Math.max(1, Math.ceil(differenceMs / (1000 * 60)))

    return {
      label: `Due in ${pluralize(minutes, 'minute')}`,
      isOverdue: false,
    }
  }

  const overdueHours = Math.floor(absoluteMs / (1000 * 60 * 60))

  if (overdueHours >= 1) {
    return {
      label: `Overdue by ${pluralize(
        Math.ceil(absoluteMs / (1000 * 60 * 60)),
        'hour',
      )}`,
      isOverdue: true,
    }
  }

  const overdueMinutes = Math.max(1, Math.ceil(absoluteMs / (1000 * 60)))

  return {
    label: `Overdue by ${pluralize(overdueMinutes, 'minute')}`,
    isOverdue: true,
  }
}

function App() {
  const [task, setTask] = useState(INITIAL_TASK)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [nowTick, setNowTick] = useState(Date.now())
  const [editDraft, setEditDraft] = useState({
    title: INITIAL_TASK.title,
    description: INITIAL_TASK.description,
    priority: INITIAL_TASK.priority,
    dueDateTime: INITIAL_TASK.dueDateTime,
  })

  const editButtonRef = useRef(null)
  const shouldReturnFocusRef = useRef(false)

  const isLongDescription = task.description.length > DESCRIPTION_COLLAPSE_THRESHOLD
  const isDescriptionExpanded = isLongDescription ? isExpanded : true

  const dueDate = useMemo(() => new Date(task.dueDateTime), [task.dueDateTime])
  const dueDateDisplay = useMemo(() => formatDueDate(task.dueDateTime), [task.dueDateTime])
  const timeState = useMemo(
    () => getTimeState(dueDate, nowTick, task.status),
    [dueDate, nowTick, task.status],
  )
  const dueDateTimeValue = Number.isNaN(dueDate.getTime())
    ? task.dueDateTime
    : dueDate.toISOString()

  useEffect(() => {
    if (task.status === 'Done') {
      return undefined
    }

    setNowTick(Date.now())

    const intervalId = setInterval(() => {
      setNowTick(Date.now())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [task.status, task.dueDateTime])

  useEffect(() => {
    if (!isEditing && shouldReturnFocusRef.current) {
      editButtonRef.current?.focus()
      shouldReturnFocusRef.current = false
    }
  }, [isEditing])

  useEffect(() => {
    if (isLongDescription) {
      setIsExpanded(false)
      return
    }

    setIsExpanded(true)
  }, [isLongDescription, task.description])

  const closeEditMode = () => {
    shouldReturnFocusRef.current = true
    setIsEditing(false)
  }

  const handleEditOpen = () => {
    console.log('edit clicked')
    setEditDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDateTime: task.dueDateTime,
    })
    setIsEditing(true)
  }

  const handleSave = (event) => {
    event.preventDefault()

    const title = editDraft.title.trim()
    const description = editDraft.description.trim()
    const parsedDueDate = new Date(editDraft.dueDateTime)

    if (!title || !description || Number.isNaN(parsedDueDate.getTime())) {
      return
    }

    setTask((previousTask) => ({
      ...previousTask,
      title,
      description,
      priority: editDraft.priority,
      dueDateTime: editDraft.dueDateTime,
    }))

    closeEditMode()
  }

  const handleCancel = () => {
    setEditDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDateTime: task.dueDateTime,
    })
    closeEditMode()
  }

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked

    setTask((previousTask) => ({
      ...previousTask,
      completed: checked,
      status: checked ? 'Done' : 'Pending',
    }))
  }

  const handleStatusControlChange = (event) => {
    const nextStatus = event.target.value

    setTask((previousTask) => ({
      ...previousTask,
      status: nextStatus,
      completed: nextStatus === 'Done',
    }))
  }

  const overdueIndicatorText =
    task.status === 'Done' ? 'Completed' : timeState.isOverdue ? 'Overdue' : 'On track'

  const cardClassName = [
    'todo-card',
    getPriorityClass(task.priority),
    getStatusClass(task.status),
    task.completed ? 'is-done' : '',
    timeState.isOverdue && task.status !== 'Done' ? 'is-overdue' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <main className="app-shell">
      <article className={cardClassName} data-testid="test-todo-card" aria-label="Todo card">
        <header className="todo-header">
          <h2 className={`todo-title ${task.completed ? 'is-complete' : ''}`} data-testid="test-todo-title">
            {task.title}
          </h2>

          <div className="priority-wrap">
            <span className="priority-pill" data-testid="test-todo-priority">
              {task.priority}
            </span>
            <span
              className="priority-indicator"
              data-testid="test-todo-priority-indicator"
              aria-label={`${task.priority} priority indicator`}
            />
          </div>
        </header>

        <section className="summary-grid" aria-label="Task summary">
          <p className="status-line">
            <span className="detail-label">Status:</span>
            <span data-testid="test-todo-status" className="status-value">
              {task.status}
            </span>
          </p>

          <p className="due-line">
            <span className="detail-label">Due date:</span>
            <time data-testid="test-todo-due-date" dateTime={dueDateTimeValue}>
              {dueDateDisplay}
            </time>
          </p>
        </section>

        <div
          className={`overdue-indicator ${timeState.isOverdue ? 'is-overdue' : ''} ${
            task.status === 'Done' ? 'is-complete' : ''
          }`}
          data-testid="test-todo-overdue-indicator"
        >
          {overdueIndicatorText}
        </div>

        <div className="todo-details">
          <time
            className="time-remaining"
            data-testid="test-todo-time-remaining"
            dateTime={dueDateTimeValue}
            aria-live="polite"
          >
            {timeState.label}
          </time>
        </div>

        {isEditing ? (
          <form className="edit-form" data-testid="test-todo-edit-form" onSubmit={handleSave}>
            <label htmlFor="todo-edit-title">Title</label>
            <input
              id="todo-edit-title"
              type="text"
              data-testid="test-todo-edit-title-input"
              value={editDraft.title}
              onChange={(event) =>
                setEditDraft((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              required
            />

            <label htmlFor="todo-edit-description">Description</label>
            <textarea
              id="todo-edit-description"
              data-testid="test-todo-edit-description-input"
              value={editDraft.description}
              onChange={(event) =>
                setEditDraft((previous) => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
              rows={4}
              required
            />

            <label htmlFor="todo-edit-priority">Priority</label>
            <select
              id="todo-edit-priority"
              data-testid="test-todo-edit-priority-select"
              value={editDraft.priority}
              onChange={(event) =>
                setEditDraft((previous) => ({
                  ...previous,
                  priority: event.target.value,
                }))
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label htmlFor="todo-edit-due-date">Due date</label>
            <input
              id="todo-edit-due-date"
              type="datetime-local"
              data-testid="test-todo-edit-due-date-input"
              value={editDraft.dueDateTime}
              onChange={(event) =>
                setEditDraft((previous) => ({
                  ...previous,
                  dueDateTime: event.target.value,
                }))
              }
              required
            />

            <div className="edit-actions">
              <button type="submit" data-testid="test-todo-save-button">
                Save
              </button>
              <button
                type="button"
                data-testid="test-todo-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <section
              id="todo-collapsible-description"
              className={`collapsible-section ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}
              data-testid="test-todo-collapsible-section"
            >
              <p className="todo-description" data-testid="test-todo-description">
                {task.description}
              </p>
            </section>

            <div className="control-row">
              <div className="checkbox-control">
                <input
                  id="todo-complete-toggle"
                  type="checkbox"
                  data-testid="test-todo-complete-toggle"
                  checked={task.completed}
                  onChange={handleCheckboxChange}
                  aria-label="Mark todo as complete"
                />
                <label htmlFor="todo-complete-toggle">Mark as complete</label>
              </div>

              <div className="status-control-group">
                <label htmlFor="todo-status-control">Update status</label>
                <select
                  id="todo-status-control"
                  data-testid="test-todo-status-control"
                  value={task.status}
                  onChange={handleStatusControlChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            {isLongDescription ? (
              <button
                type="button"
                className="expand-toggle"
                data-testid="test-todo-expand-toggle"
                aria-expanded={isDescriptionExpanded}
                aria-controls="todo-collapsible-description"
                onClick={() => setIsExpanded((previous) => !previous)}
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            ) : null}

            <ul className="tags" data-testid="test-todo-tags" aria-label="Todo tags">
              {task.tags.map((tag) => (
                <li key={tag} data-testid={getTagTestId(tag)}>
                  #{tag}
                </li>
              ))}
            </ul>

            <div className="actions">
              <button
                ref={editButtonRef}
                type="button"
                data-testid="test-todo-edit-button"
                onClick={handleEditOpen}
              >
                Edit
              </button>
              <button
                type="button"
                data-testid="test-todo-delete-button"
                onClick={() => alert('delete clicked')}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </article>
    </main>
  )
}

export default App
