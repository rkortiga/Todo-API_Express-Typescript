# TodoAPI

A simple CRUD Todo API built with **Express** and **TypeScript**, following Clean Architecture principles.

## Features

- **Clean Architecture** structure (domain, application, infrastructure, and API layers).
- **SQL Server** integration via a repository pattern.
- **Swagger** documentation for easy API exploration.

## Getting Started

1. **Clone the Repository**  
   ```
   git clone https://github.com/rkortiga/Todo-API_Express-Typescript.git
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Create a .env file in the project root:**
   ```
   SQL_USER=your_username
   SQL_PASSWORD=your_password
   SQL_SERVER=localhost
   SQL_DATABASE=YourDatabase
   SQL_ENCRYPT=false
   SQL_TRUST_SERVER_CERTIFICATE=true
   PORT=your_port_number
   ```
4. **Run in Development Mode**
   ```
   npm run dev
   ```

## Usage
**By default, Swagger UI is available at http://localhost:3000/api-docs unless you configure a different port in your `.env` file.**

**Endpoints:**
- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`
