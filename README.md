# Frontend Test – Updated Workspace

This project is based on the original frontend test assignment, updated for modern tooling and a cleaner developer experience.

## Changes Made

- Migrated to an npm workspace structure:
  ```
  apps/client → Angular frontend
  apps/planets-api → Node.js backend (unchanged)
  ```
- Replaced Angular 10 with Angular 18 (standalone components, strict mode enabled)
- Upgraded to Node.js v22 (via Volta) — current stable release
- Removed the legacy run-app.sh script
- Added a unified npm start using run-p for cross-platform parallel dev

## Getting Started

Install dependencies:

```
npm install
```

Start the full stack (frontend + backend):

```
npm start
```

This will:

Serve the Angular 18 app on http://localhost:4200

Launch the API on http://localhost:3001

## Project Structure

```
apps/
├── client         # Angular 18 frontend
└── planets-api    # Node.js backend (unchanged)
```

## Scripts
Defined in the root package.json:

```json
{
"scripts": {
  "start": "run-p start:client start:api",
  "start:client": "npm --workspace apps/client start",
  "start:api": "npm --workspace apps/planets-api start"
  }
}
```

`npm start` → Runs both frontend and backend in parallel

`npm --workspace apps/client start` → Run only the Angular app

`npm --workspace apps/planets-api start` → Run only the API

## Frontend Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Design link

[Figma link](https://www.figma.com/file/ce6sSBQstsWRWRaS6AKnqK/Frontend-test?node-id=2%3A69)

## Development server

#### To run client and api together

- Open the terminal
- `npm install` inside _planets-api_ folder
- `npm install` inside _client_ folder
- Run `./run-app.sh`

#### Table of API's

| Method | Resource | Description | Content type |
| ------ | ------ | ------ | ------ |
| POST |  /api/planets | Create new planet | form-data
| GET |   /api/planets | Get all planets |
| GET |   /api/planets/{id} | Get one planet |
| PUT |   /api/planets/{id} | Update planet | form-data
| DELETE | /api/planets/{id} | Delete one planet |
| GET |   /api/planets/reload | Reload planet data |

## Task description

You are supposed to create an app for showing information about planets. 
You should also be able to create, edit or delete planets. <br>
Create a repo on your github with public access and push yor work there.

#### Landing page:

  - Create a landing page which will consist of:
  - Grid layout of planets
  - Table - here we will list all the planets
  - Sorting of planets in the table by at least one property
  - Search - used to search the planets in the table
  - SWITCH VIEW button which will switch the view between grid and table view of planets
  - CREATE button - used to add a new planet in the table
  - CREATE button will trigger a dialog with a form for creating planet

#### Single item page:

  - Create a single planet page which will show information about a single item
  - Under item information show two buttons - EDIT and DELETE
  - EDIT button will trigger a dialog with a form for updating item
  - DELETE button will trigger a confirmation popup

#### Dialog:

  - Dialog to show the form for create/edit item
  - CONFIRM button will trigger confirmation popup
  - CANCEL button will close the dialog and disregard all changes made in the form

#### Popup:

(This popup should appear after the action in the dialog, and it can appear after the dialog is closed or on top of dialog)

- Confirmation popup for CREATE / EDIT / DELETE action
  - Popup must have a message:
    “Are you sure you want to CREATE / EDIT / DELETE [itemName]?
  - Two buttons - CONFIRM and CANCEL
  - CONFIRM button will CREATE / EDIT / DELETE item
  - CANCEL button will close the popup and discard all changes made in the form
