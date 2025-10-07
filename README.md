# Repo Scope

This repository contains a full-stack user management application with a React frontend and a Node.js backend. The application allows users to register, log in, manage their profile, and view their GitHub repositories.

## Demo

![Demo GIF](client/src/assets/ss/demo.gif)

Here are some screenshots of the application:

| Login | Signup | Home (User Profile) |
| --- | --- | --- |
| ![Login](client/src/assets/ss/login.png) | ![Signup](client/src/assets/ss/singup.png) | ![Home](client/src/assets/ss/home2.png) |

| Edit Profile | Repo List | Cache |
| --- | --- | --- |
| ![Edit Profile](client/src/assets/ss/editProfile.png) | ![Repo List](client/src/assets/ss/home1.png) | ![Cache](client/src/assets/ss/cache.png) |


## Features

### Client

-   **Authentication**: User login and signup functionality.
-   **Profile Management**: Users can view and update their profile information.
-   **GitHub Integration**: View user details and a list of their repositories from GitHub.
-   **Input Validation**: Forms include client-side validation for a better user experience.
-   **Caching**: Caches GitHub repository data to reduce API calls and improve performance.

### Server

-   **User Authentication**: Secure user registration and login using JWT.
-   **Input Validation**: Server-side validation for email, name, and password.
-   **Security**: Includes Helmet for securing HTTP headers.
-   **API Rate Limiting**: General rate limiting to prevent abuse and a specific limiter for the GitHub API.
-   **CORS**: Configured to allow requests from the frontend application.


## Setup

The project is divided into two main parts: `client` and `server`.

### Client (React + TypeScript + Vite)

To run the client application:

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

### Server (Node.js + Express + TypeScript)

To run the server:

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## Architecture Decisions

### Client

-   **TypeScript**: Chosen for its static type checking, which helps catch errors early in the development process and improves code quality and maintainability.
-   **Vite**: Selected as the build tool for its fast development server and optimized build process, providing a lightweight and efficient development experience.

### Server

-   **LowDB**: A lightweight, JSON-based database was chosen because it is simple to set up and well-suited for the current scope of the application, which does not require a complex database solution.
-   **MVC-like Structure**: The server follows a Model-View-Controller (MVC) architectural pattern (excluding the View layer) to separate concerns, resulting in a cleaner, more organized, and scalable codebase.

## API Endpoints

The server exposes the following API endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | User registration. |
| POST | `/login` | User login. |
| GET | `/profile` | Get the profile of the authenticated user. |
| PUT | `/profile` | Update the profile of the authenticated user. |
| GET | `/user-repos` | Get the GitHub repositories of a user. |
