# HNG Todo Card - Stage 1a + Stage 1b

React + Vite implementation covering both HNG Frontend stages in one repository:

- Stage 1a Advanced Todo Card at `/`
- Stage 1b Profile Card at `/profile`

The project keeps Stage 0 required selectors intact and adds Stage 1a and Stage 1b requirements on top.

## Live And Repo

- Live URL: https://hng-todo-card-omega.vercel.app/
- Profile Route: https://hng-todo-card-omega.vercel.app/profile
- GitHub Repository: https://github.com/Realdiamond/hng-todo-card

## Route Mapping

- `/`: Stage 1a Advanced Todo Card
- `/profile`: Stage 1b Profile Card

## Stage 1a Scope

- Single advanced Todo Card (not a full Todo app)
- React state-driven interactions
- Plain CSS only (no external UI libraries)
- Semantic, testable, accessible, responsive implementation

## Stage 1b Scope

- Dedicated Profile Card page on `/profile`
- User details rendered from a static profile object
- Live UTC milliseconds display using `Date.now()`
- Avatar, social links, hobbies, and dislikes sections
- Plain CSS responsive layout

## Default Data

### Todo Card

- Title: Finish HNG Stage 1a Task
- Description: Long descriptive text (for collapse/expand demonstration)
- Priority: High
- Status: In Progress
- Tags: work, urgent, frontend
- Due date source: datetime value used for live calculations

### Profile Card

- Name: Real Diamond
- Bio: Frontend engineer focused on accessible interfaces and clean implementation
- Social links: GitHub, LinkedIn, Twitter
- Lists: Hobbies and Dislikes

## Implemented Test IDs

### Stage 0 IDs (kept exactly)

- test-todo-card
- test-todo-title
- test-todo-description
- test-todo-priority
- test-todo-due-date
- test-todo-time-remaining
- test-todo-status
- test-todo-complete-toggle
- test-todo-tags
- test-todo-edit-button
- test-todo-delete-button

### Optional Tag IDs

- test-todo-tag-work
- test-todo-tag-urgent

### Stage 1a IDs

- test-todo-edit-form
- test-todo-edit-title-input
- test-todo-edit-description-input
- test-todo-edit-priority-select
- test-todo-edit-due-date-input
- test-todo-save-button
- test-todo-cancel-button
- test-todo-status-control
- test-todo-priority-indicator
- test-todo-expand-toggle
- test-todo-collapsible-section
- test-todo-overdue-indicator

### Stage 1b Required IDs

- test-profile-card
- test-user-name
- test-user-bio
- test-user-avatar
- test-user-time
- test-user-social-links
- test-user-hobbies
- test-user-dislikes

### Stage 1b Optional Social IDs

- test-user-social-twitter
- test-user-social-github
- test-user-social-linkedin

## Behavioral Notes

### Stage 1a Todo Behavior

- Edit opens form mode with Save/Cancel
- Save updates title, description, priority, and due date
- Checkbox and status dropdown remain synchronized
- Time labels update every 60 seconds while not done
- Overdue indicator updates from due-time calculations

### Stage 1b Profile Behavior

- Profile route renders a separate card view
- Current time value updates every second with `Date.now()`
- Social links open in a new tab

## Accessibility Notes

- Semantic structure with article/header/section/nav/list elements
- Native interactive controls for keyboard accessibility
- Labeled form fields and visible focus outlines
- Live time text uses `aria-live="polite"`

## Responsiveness

- Todo page remains centered and stable across breakpoints
- Profile page switches to stacked layout on smaller screens
- Content wraps correctly without horizontal overflow

## Known Limitations

- Todo delete action is currently a demo alert only
- Due date display follows browser local timezone formatting
- Route switching is pathname-based without a routing library

