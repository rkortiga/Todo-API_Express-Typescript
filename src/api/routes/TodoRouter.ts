import { Request, Response, Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { TodoService } from '../../application/services/TodoService';
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository';
import { Validator } from '../middleware/Validator';
import { UpdateTodoDto } from '../../domain/dtos/UpdateTodoDto';

const router = Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.get('/', (req: Request, res: Response) => todoController.getAll(req, res));
router.get('/:id', (req: Request<{ id: string }>, res: Response) => todoController.getById(req, res));
router.post('/', Validator.validateCreateTodo, (req: Request, res: Response) => todoController.create(req, res));
router.put(
      '/:id',
      Validator.validateUpdateTodo,
      (req: Request<{ id: string }, any, UpdateTodoDto>, res: Response) => todoController.update(req, res)
);
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => todoController.delete(req, res));

export default router;
