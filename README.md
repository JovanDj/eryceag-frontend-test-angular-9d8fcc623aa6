# Frontend Test – Updated Workspace

This project is based on the original frontend test assignment, updated for modern tooling and a cleaner developer experience.

## Changes Made

- Migrated to an npm workspace structure:
  ```
  apps/client → Angular frontend
  apps/planets-api → Node.js backend (unchanged)
  ```
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

Run frontend tests:

```
npm run test --workspace apps/client
```

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

# Frontend Developer Test - Angular

## Design Prototype

Please refer to the following Figma design for UI/UX guidelines:

[Figma Link](https://www.figma.com/file/ce6sSBQstsWRWRaS6AKnqK/Frontend-test?node-id=2%3A69)

---

## Getting Started

To run both the frontend client and backend API locally, follow these steps:

1. Inside `planet-api` directory, run:

```bash
npm install
```

2. Inside `client` directory, run:

```bash
npm install
```

3. From the project root directory:

```bash
./run-app.sh
```

This script will start both the client app and API server.

---

## API Endpoints

The backend API supports the following endpoints:

| Method | Endpoint              | Description                    | Content-Type |
| ------ | --------------------- | ------------------------------ | ------------ |
| POST   | `/api/planets`        | Create a planet                | form-data    |
| GET    | `/api/planets`        | Retrieve all planets           | -            |
| GET    | `/api/planets/{id}`   | Retrieve a single planet by ID | -            |
| PUT    | `/api/planets/{id}`   | Update a planet                | form-data    |
| DELETE | `/api/planets/{id}`   | Delete a planet                | -            |
| GET    | `/api/planets/reload` | Reload planet data             | -            |

---

## Task Overview

Your objective is to build a simple Angular application that manages information about planets. The application should
allow users to:

- View a list of all planets
- Toggle between grid and table views
- Search and sort the list of planets
- Create new planets
- Edit existing planets
- Delete planets
- View detailed information for a single planet

Once complete, push your work to a **public GitHub repository** and share the link with us.

---

## Landing Page Requirements

The landing page should include the following features:

- **Grid and Table View Toggle**: Allow users to switch between a card grid layout and a data table.
- **Table Features**:
    - Sortable columns (at least one sortable field)
    - Search/filter functionality for planet names or other fields
- **Action Buttons**:
    - `CREATE`: Opens a modal/dialog form for adding a new planet
    - `SWITCH VIEW`: Switches between table and grid views

---

## Single Planet Details Page

When a user selects a planet, show a dedicated page with the following:

- Detailed information about the selected planet
- Two buttons:
    - `EDIT`: Opens a dialog with the planet's existing data pre-filled for editing
    - `DELETE`: Opens a confirmation popup before deleting

---

## Dialog Component Behavior

Use dialog for both **creating** and **editing** planets. Each dialog should contain:

- A form for entering/editing planet details
- Two buttons:
    - `CONFIRM`: Submits the form and shows a confirmation popup
    - `CANCEL`: Closes the dialog without saving changes

---

## Confirmation Popup

After the user confirms a create, edit, or delete action, a popup should appear to double-check the action. The popup
should contain:

- A clear message:  
  `Are you sure you want to CREATE / EDIT / DELETE [itemName]?`
- Two buttons:
    - `CONFIRM`: Proceeds with the action
    - `CANCEL`: Cancels the action and closes the popup

---

## Notes

- Focus on clean and maintainable code architecture
- Use Angular best practices
- You may use standalone components
- Responsive design is encouraged but not required

---

Let us know if you have any questions. Good luck!