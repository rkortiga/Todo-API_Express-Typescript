# TodoAPI

A simple CRUD Todo API built with **Express** and **TypeScript**, following Clean Architecture principles.

## Highlights

- **Clean Architecture** structure (domain, application, infrastructure, and API layers).
- **SQL Server** integration via a repository pattern.
- **Swagger** documentation.
- Automated database creation via a custom initialization script (**docker-entrypoint.sh**).
- Schema migration using **TypeORM**
- **Docker** and **Docker** Compose for containerization and orchestration.

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

4. **Configure ORM:**  
   An `ormconfig.example.json` file is provided as a template. To use a configuration file for TypeORM, create a new
   file `ormconfig.json` in the root and copy
   ormconfig.example.json template to it, and update it with your specific credentials.


5. **Run in Development Mode (without Docker):**

   ```
   npm run dev
   ```

## Running with Docker

Make sure you have Docker and Docker Compose installed. Then run:

```bash
docker-compose up -d --build
```

This command will:

- Build the API container.
- Start a SQL Server container with the credentials specified in your `.env` file.
- Run a custom entrypoint script that initializes the database (creating TodoDB if it doesn't exist) before starting the
  API.
- Expose the API on port 3000 and Swagger UI at http://localhost:3000/api-docs.

### Accessing the Database via SSMS

After the containers are running, you can connect to the SQL Server instance using SQL Server Management Studio (SSMS)
with the following settings:

```bash
- Server Name: localhost,1433
- Authentication: SQL Server Authentication
- Login: sa
- Password: the value specified in your .env file (e.g., Example!Passw0rd)
- Database: TodoDB
```

### NOTE

- Before running Docker Compose, ensure that any local instance of SQL Server is stopped to avoid port conflicts with
  the SQL Server container orchestrated by Docker Compose. This can be done via the SQL Server Configuration Manager on
  your host machine.

- The API container uses the environment variable SQL_SERVER (set to `db` in the `.env` file) to connect to the
  database.
  Docker Compose sets up an internal network where containers communicate using their service names as DNS hostnames.

- Use `sa` as the username and the value of SQL_PASSWORD from your `.env` file for SQL Server authentication.

- After successfully running Docker Compose, you can access the SQL Server instance via SSMS using the connection
  settings mentioned above.

### Your `.env` file should look somewhat like this

```bash
SQL_USER=sa
SQL_PASSWORD=Example!Passw0rd
SQL_SERVER=db
SQL_PORT=1433
SQL_DATABASE=TodoDB
SQL_ENCRYPT=false
SQL_TRUST_SERVER_CERTIFICATE=true
PORT=3000
```

## Usage

**By default, Swagger UI is available at http://localhost:3000/api-docs unless you configure a different port in
your `.env` file.**

**Endpoints:**

- `GET /todos`
- `GET /todos/:id`
- `POST /todos`
- `PUT /todos/:id`
- `DELETE /todos/:id`