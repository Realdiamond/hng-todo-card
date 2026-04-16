# HNG Todo Card - Stage 1a

A React + Vite single-card implementation for the HNG Frontend Stage 1a task.

This project extends Stage 0 into an interactive, stateful Todo Card while keeping all Stage 0 required selectors and semantics.

## Live And Repo

- Live URL: https://hng-todo-card-omega.vercel.app/
- GitHub Repository: https://github.com/Realdiamond/hng-todo-card

## Stage 1a Scope

- Single Todo Card only (not a full Todo app)
- React + plain CSS only
- No external UI libraries
- Semantic, testable, accessible, responsive implementation

## What Changed From Stage 0

- Added full edit mode with save/cancel flow
- Added interactive status control
- Added synchronized state between checkbox and status control
- Added dynamic priority indicator with visual emphasis
- Added expand/collapse behavior for long description
- Added overdue indicator and granular time logic
- Added periodic time updates (every 60 seconds)

## Default Card Data

- Title: Finish HNG Stage 1a Task
- Description: Long descriptive text (for collapse/expand demonstration)
- Priority: High
- Status: In Progress
- Tags: work, urgent, frontend
- Due date source: datetime value used for live calculations

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

## Behavioral Notes

### Edit Mode

- Edit opens form mode
- Save updates the card values
- Cancel restores previous values
- When edit mode closes, focus returns to the Edit button

### Status Synchronization

- Checking checkbox sets status to Done
- Unchecking checkbox sets status to Pending
- Changing status control to Done checks checkbox
- Status label, status control, and checkbox remain synchronized

### Time And Overdue Logic

- Time updates every 60 seconds using setInterval
- Uses friendly labels such as:
  - Due in X days
  - Due tomorrow
  - Due in X hours
  - Due in X minutes
  - Due now!
  - Overdue by X hours/minutes
- If status is Done:
  - time text becomes Completed
  - live time updates stop

## Design Decisions

- Kept one centered card to match assignment scope
- Added subtle but clear visual states for:
  - priority (left border + indicator)
  - status (badge styles)
  - overdue (red accent)
  - done (muted background + strike-through)
- Used a clear form layout in edit mode for readability and keyboard use
- Kept styling intentionally clean and lightweight (no animations)

## Accessibility Notes

- Semantic elements used: article, h2, p, time, input, label, ul/li, button
- All interactive controls are native and keyboard accessible
- Expand toggle uses aria-expanded and aria-controls
- Time remaining uses aria-live="polite"
- Edit fields are explicitly labeled with label + htmlFor
- Focus-visible outlines are provided for inputs, selects, textareas, and buttons

## Responsiveness

- 320px: single-column stacked layout, full-width card
- 768px: improved spacing and grouped controls
- 1024px+: centered card with comfortable max width
- Long text and tags wrap without horizontal overflow

## Known Limitations

- Focus trap inside edit mode is not implemented (optional bonus item)
- Delete action is currently a demo alert only
- Due date formatting uses the browser local timezone

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Build production bundle:

   ```bash
   npm run build
   ```

4. Preview production build:

   ```bash
   npm run preview
   ```
