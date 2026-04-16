# HNG Todo Item Card (Stage 0)

A React + Vite implementation of the HNG Frontend Stage 0 task: build a clean, accessible, and testable Todo Item Card with exact test selectors.

## Project Overview

This project renders a single Todo card with:

- semantic HTML structure
- exact `data-testid` values required for automated checks
- completion toggle behavior
- edit and delete button actions
- dynamic time-remaining text based on due date
- responsive design for mobile and desktop

## Hardcoded Todo Data

- Title: Finish HNG Stage 0 Task
- Description: Build a clean, accessible and testable todo card.
- Priority: High
- Status: In Progress
- Tags: work, urgent, frontend
- Due date: April 16, 2026 18:00

## Required Test IDs Implemented

- `test-todo-card`
- `test-todo-title`
- `test-todo-description`
- `test-todo-priority`
- `test-todo-due-date`
- `test-todo-time-remaining`
- `test-todo-status`
- `test-todo-complete-toggle`
- `test-todo-tags`
- `test-todo-edit-button`
- `test-todo-delete-button`

## Behavior

- Checkbox toggle:
  - marks task complete
  - adds strike-through to title
  - changes status to Done
- Edit button: logs `edit clicked` in the console
- Delete button:
  - shows alert `delete clicked`
  - removes the card from view
- Time remaining label supports:
  - Due in X days
  - Due tomorrow
  - Due today
  - Overdue by X hours

## Accessibility

- Semantic tags are used (`article`, `h2`, `p`, `time`, `button`, `input`, `label`, `ul`, `li`)
- Checkbox has associated label and aria-label
- Buttons have accessible names
- Keyboard focus styles are included

## Responsive UI

- Mobile: full width
- Desktop: centered card with max-width 420px
- Tags and action buttons wrap correctly
- No horizontal overflow

## Tech Stack

- React 19
- Vite 8
- Plain CSS
