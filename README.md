# BloodConnect 🩸

**BloodConnect** is a full-stack Blood Donor Management System built to manage donor information through a browser-based interface and a Flask REST API.

The project started as a simple frontend prototype and has evolved into a working CRUD application with persistent SQLite storage, frontend validation, API communication, and donor management operations.

## Overview

BloodConnect allows users to:

- Register as a blood donor
- View registered donors
- Filter donors by blood group
- Edit donor information
- Remove donor records
- Persist donor data in a SQLite database
- Communicate with a Flask backend through REST endpoints

## Current Features

### Donor Management
- Donor registration form
- Blood-group selection
- Availability status
- Client-side form validation
- Donor listing
- Blood-group filtering
- Edit donor records
- Delete donor records

### Backend
- Flask REST API
- SQLite database
- CRUD operations
- JSON request/response handling
- HTTP status codes for successful and failed operations
- CORS support for frontend-backend communication

### Frontend
- HTML5 interface
- CSS styling
- JavaScript-based API integration
- Dynamic donor rendering
- Search/filter interaction
- Success and error feedback

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Database | SQLite |
| API | REST / JSON |
| Development | VS Code, Live Server |
| Version Control | Git & GitHub |

## Application Architecture

```text
┌──────────────────────────────┐
│        BloodConnect UI       │
│      HTML / CSS / JS         │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│        Flask REST API        │
│          backend/app.py      │
└──────────────┬───────────────┘
               │ SQL
               ▼
┌──────────────────────────────┐
│       SQLite Database        │
│       bloodconnect.db        │
└──────────────────────────────┘
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/donors` | Retrieve registered donors |
| POST | `/api/donors` | Register a new donor |
| PUT | `/api/donors/<donor_id>` | Update donor information |
| DELETE | `/api/donors/<donor_id>` | Delete a donor |

## Project Structure

```text
BloodConnect/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
│
├── screenshots/
│   ├── home-page.png
│   ├── donor-registration.png
│   ├── registered-donors-phones-blurred.png
│   └── registration-success.png
│
└── backend/
    ├── app.py
    └── database.py
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/vignesh7780-C137/BloodConnect.git
cd BloodConnect
```

### 2. Install the backend dependencies

```bash
pip install flask flask-cors
```

### 3. Start the Flask backend

```bash
cd backend
python app.py
```

The API runs on:

```text
http://127.0.0.1:5000
```

### 4. Open the frontend

Open `index.html` using VS Code Live Server, or serve the frontend through a local web server.

## Screenshots

### Home Page
![BloodConnect Home Page](screenshots/home-page.png)

### Donor Registration
![Donor Registration](screenshots/donor-registration.png)

### Registered Donors
![Registered Donors](screenshots/registered-donors-phones-blurred.png)

### Registration Success
![Registration Success](screenshots/registration-success.png)

## What I Learned

This project provided practical experience with:

- Building a frontend using HTML, CSS and JavaScript
- Connecting a frontend application to a Python backend
- Designing and consuming REST APIs
- Handling GET, POST, PUT and DELETE operations
- Working with SQLite persistence
- Validating user input
- Debugging frontend-backend communication
- Managing project changes with Git and GitHub

## Roadmap

BloodConnect is being developed incrementally rather than as a single large feature dump.

### Planned Improvements

- Blood request management
- Donor-to-request matching
- Blood-group compatibility logic
- User authentication and role-based access
- Hospital / blood-bank workflow
- Improved database architecture
- Automated tests
- API documentation
- Production deployment
- Better security and data validation
- Containerization and CI/CD

The goal is to evolve BloodConnect from a basic donor management application into a more realistic healthcare workflow system while keeping each improvement purposeful and maintainable.

## License

This project is currently intended as a learning and portfolio project.
