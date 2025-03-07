import { Router } from 'express';
import { Request, Response } from 'express';
import { TodoController } from '../controllers/TodoController';
import { TodoService } from '../../application/services/TodoService';
import { SqlServerTodoRepository } from '../../infrastructure/repositories/SqlServerTodoRepository';

const router = Router();

// Instantiate the repository, service, and controller.
const todoRepository = new SqlServerTodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

// Map routes to controller methods.
router.get('/', (req: Request, res: Response) => todoController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => todoController.getById(req, res));
router.post('/', (req: Request, res: Response) => todoController.create(req, res));
router.put('/:id', (req: Request, res: Response) => todoController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => todoController.delete(req, res));

export default router;
