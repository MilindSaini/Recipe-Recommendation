# Recipe Recommendation Application

This project is a web application for recommending recipes. It consists of a Java-based backend and a Next.js frontend.

## Getting Started

### Prerequisites

*   Java 17 or later
*   Maven
*   Node.js and npm

### Backend

To run the backend server:

1.  Navigate to the `recipe` directory:
    ```bash
    cd recipe
    ```
2.  Run the application using the Maven wrapper:
    ```bash
    ./mvnw spring-boot:run
    ```
The backend will be running on `http://localhost:8080`.

### Frontend

To run the frontend application:

1.  Navigate to the `Recipe Frontend` directory:
    ```bash
    cd "Recipe Frontend"
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
The frontend will be running on `http://localhost:3000`.

## Project Structure

*   `recipe/`: The Java-based backend application.
*   `Recipe Frontend/`: The Next.js frontend application.
