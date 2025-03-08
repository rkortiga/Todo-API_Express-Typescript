import { Request, Response } from 'express';
import { TodoService } from '../../application/services/TodoService';
import { CreateTodoDto } from '../../domain/dtos/create-todo-dto';
import { UpdateTodoDto } from '../../domain/dtos/update-todo-dto';
import { Todo } from '../../domain/entities/todo';

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */
export class TodoController {

      constructor(private todoService: TodoService) {
      }

      /**
       * @swagger
       * /todos:
       *   get:
       *     summary: Retrieve a list of todos
       *     tags: [Todos]
       *     responses:
       *       200:
       *         description: A list of todos.
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 $ref: '#/components/schemas/Todo'
       *       500:
       *         description: Server error.
       */
      async getAll(_req: Request, res: Response<Todo[] | { error: string }>): Promise<void> {
            try {
                  const todos = await this.todoService.getAllTodos();
                  res.json(todos);
            } catch (error: any) {
                  res.status(500).json({error: error.message});
            }
      }

      /**
       * @swagger
       * /todos/{id}:
       *   get:
       *     summary: Retrieve a single todo by ID
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *         description: The todo ID.
       *     responses:
       *       200:
       *         description: The requested todo.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Todo'
       *       404:
       *         description: Todo not found.
       *       500:
       *         description: Server error.
       */
      async getById(req: Request<{ id: string }>, res: Response<Todo | { error: string }>): Promise<void> {
            try {
                  const todo = await this.todoService.getTodoById(req.params.id);
                  if (!todo) {
                        res.status(404).json({error: 'Todo not found'});
                  } else {
                        res.json(todo);
                  }
            } catch (error: any) {
                  res.status(500).json({error: error.message});
            }
      }

      /**
       * @swagger
       * /todos:
       *   post:
       *     summary: Create a new todo
       *     tags: [Todos]
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/CreateTodoDto'
       *     responses:
       *       201:
       *         description: Todo created successfully.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Todo'
       *       500:
       *         description: Server error.
       */
      async create(req: Request<{}, {}, CreateTodoDto>, res: Response<Todo | { error: string }>): Promise<void> {
            try {
                  const dto: CreateTodoDto = req.body;
                  const newTodo = await this.todoService.createTodo(dto);
                  res.status(201).json(newTodo);
            } catch (error: any) {
                  res.status(500).json({error: error.message});
            }
      }

      /**
       * @swagger
       * /todos/{id}:
       *   put:
       *     summary: Update an existing todo
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *         description: The todo ID.
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             $ref: '#/components/schemas/UpdateTodoDto'
       *     responses:
       *       200:
       *         description: Todo updated successfully.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/Todo'
       *       500:
       *         description: Server error.
       */
      async update(req: Request<{ id: string }, {}, UpdateTodoDto>,
                   res: Response<Todo | { error: string }>): Promise<void> {
            try {
                  const dto: UpdateTodoDto = req.body;
                  const updatedTodo = await this.todoService.updateTodo(req.params.id, dto);
                  res.json(updatedTodo);
            } catch (error: any) {
                  res.status(500).json({error: error.message});
            }
      }

      /**
       * @swagger
       * /todos/{id}:
       *   delete:
       *     summary: Delete a todo
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *         description: The todo ID.
       *     responses:
       *       204:
       *         description: Todo deleted successfully.
       *       500:
       *         description: Server error.
       */
      async delete(req: Request<{ id: string }>, res: Response<{ error: string } | void>): Promise<void> {
            try {
                  await this.todoService.deleteTodo(req.params.id);
                  res.status(204).send();
            } catch (error: any) {
                  res.status(500).json({error: error.message});
            }
      }
}
