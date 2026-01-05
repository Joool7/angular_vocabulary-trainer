# Vocabulary Trainer

A small Angular app to help learn and practice vocabulary with quizzes and review sessions.

## Quick start

- Prerequisites: Node.js, npm, Angular CLI
- Install: `npm install`
- Start dev server: `npm start` (or `ng serve`)
- Build: `npm run build` (or `ng build`)

## Project structure

- `src/app` — core app, components, and services
- `src/assets` — static assets

## Main Views

Running the app needs internet connection as fonts are not offline available. Developped and tested for Google Chrome.

### Manage

- Purpose: Create, edit, and delete vocabulary entries in a word list
- UI: List view for creating, update and delete words, bulk import some default words, and sort them alphabetically by either german or english. Reset word list if needed.

### Train

- Purpose: Active learning via review sessions to build recall and retention.
- Flow: Items are shown one at a time; reveal translations and self-grade (e.g., "I remembered" / "I forgot") to influence future scheduling.
- Behavior: Missed items are queued for prioritized future review; correct responses reduce short-term repetition frequency.

### Examine

- Purpose: Formal assessment to measure retained knowledge (quiz mode).
- Flow: Presents timed or untimed quizzes. Questions are randomized and drawn from current set.
- Feedback & scoring: Session summary with score and items to revisit.

## How they work together (Conclusion)

- The three components form a cycle:
  1. Manage — create and maintain a word set.
  2. Train — practice and build reliable recall with repeated exposure and prioritization for missed items.
  3. Examine — assess retention and highlight items that need further training or editing.
- Shared services (e.g., `WordPairService`) keep state synchronized: Manage updates the word data, Train/Examine read that data and write progress metadata, and progress is persisted so future sessions reflect prior performance (localStorage).
- Recommended workflow: maintain your list (Manage), train frequently (Train) to build recall, and periodically examine (Examine) to verify progress; return to Manage to refine content.
