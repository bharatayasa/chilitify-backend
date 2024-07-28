# Express API Router

This repository contains the Express API router for handling various routes related to user management, prediction data, description data, and more. It integrates middleware for authentication and role-based access control.

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```

3. **Install the required dependencies:**
    ```bash
    npm install
    ```

## Middleware

- **AccesToken:** Middleware for validating user authentication tokens.
- **checkRole:** Middleware for checking user roles (e.g., 'admin', 'user').

## Routes

### General

- `GET /`: Returns server information.

### User Authentication

- `POST /register`: Registers a new user.
- `POST /login`: Logs in an existing user.

### Description Data

- `GET /description`: Retrieves all description data (admin only).
- `GET /description/:id`: Retrieves a description by ID (admin only).
- `POST /description`: Adds new description data (admin only).
- `PUT /description/:id`: Updates description data by ID (admin only).
- `DELETE /description/:id`: Deletes description data by ID (admin only).

### Prediction Data

- `GET /predicted`: Retrieves all prediction data (admin only).
- `DELETE /predicted/:id`: Deletes prediction data by ID (admin only).

### Users

- `GET /user`: Retrieves all users (admin only).
- `GET /user/:id`: Retrieves a user by ID (admin only).
- `POST /user`: Adds a new user (admin only).
- `PUT /user/:id`: Updates user data by ID (admin only).
- `DELETE /user/:id`: Deletes a user by ID (admin only).

### Dashboard

- `GET /total/prediction`: Retrieves the total number of predictions (admin only).
- `GET /total/users`: Retrieves the total number of users (admin only).
- `GET /total/class`: Retrieves the total number of classes (admin only).

### Prediction

- `POST /predict`: Makes a prediction based on uploaded file (user only). File should be included in the request as `file`.

### History

- `GET /history`: Retrieves prediction history for the user (user only).
- `DELETE /history/:id`: Deletes a prediction history entry by ID (user only).

### User Profile

- `GET /get/me`: Retrieves the current user's profile.
- `POST /update/me`: Updates the current user's profile.
- `POST /update/me/password`: Updates the current user's password.

## Usage

Ensure that you have the necessary environment variables and configuration set up. You may need to configure your database connection and other environment-specific settings.

To start the server, use:

```bash
npm run dev
