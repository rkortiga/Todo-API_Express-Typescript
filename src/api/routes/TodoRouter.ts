import { Request, Response, Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { TodoService } from '../../application/services/TodoService';
import { TodoRepository } from '../../infrastructure/repositories/todo-repository';
import { Validator } from '../middleware/Validator';
import { CreateTodoDto } from '../../domain/dtos/create-todo-dto';
import { UpdateTodoDto } from '../../domain/dtos/update-todo-dto';
import { Todo } from '../../domain/entities/Todo';

const router = Router();

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.get(
      '/',
      (req: Request, res: Response<Todo[] | { error: string }>) =>
            todoController.getAll(req, res)
);

router.get(
      '/:id',
      (req: Request<{ id: string }>, res: Response<Todo | { error: string }>) =>
            todoController.getById(req, res)
);

router.post(
      '/',
      Validator.validateCreateTodo,
      (req: Request<{}, unknown, CreateTodoDto>, res: Response<Todo | { error: string }>) =>
            todoController.create(req, res)
);

router.put(
      '/:id',
      Validator.validateUpdateTodo,
      (req: Request<{ id: string }, unknown, UpdateTodoDto>, res: Response<Todo | { error: string }>) =>
            todoController.update(req, res)
);

router.delete(
      '/:id',
      (req: Request<{ id: string }>, res: Response<{ error: string } | void>) =>
            todoController.delete(req, res)
);

export default router;
