import express from "express";
import { InMemoryTodoRepository } from "./infrastructure/repositories/InMemoryTodoRepository";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { TodoService } from './application/services/TodoService';
import { TodoController } from './api/controllers/TodoController';
import { SqlServerTodoRepository } from './infrastructure/repositories/SqlServerTodoRepository';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize repository, service, and controller
//const todoRepository = new InMemoryTodoRepository();
const todoRepository = new SqlServerTodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = TodoController(todoService);

app.use("/todos", todoController);

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
