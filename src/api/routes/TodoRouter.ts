import { Request, Response, Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { TodoService } from '../../application/services/TodoService';
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository';

const router = Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.get('/', (req: Request, res: Response) => todoController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => todoController.getById(req, res));
router.post('/', (req: Request, res: Response) => todoController.create(req, res));
router.put('/:id', (req: Request, res: Response) => todoController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => todoController.delete(req, res));

export default router;
