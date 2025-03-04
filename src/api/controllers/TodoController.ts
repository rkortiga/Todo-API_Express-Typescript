import { TodoService } from '../../application/services/TodoService';
import { Router, Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */
export function TodoController(todoService: TodoService) {
      const router = Router();

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
       *         description: Server error
       */
      router.get("/", async (_req: Request, res: Response) => {
            try {
                  const todos = await todoService.getAllTodos();
                  res.json(todos);
            } catch (error: any) {
                  res.status(500).json({ error: error.message });
            }
      });

      /**
       * @swagger
       * /todos/{id}:
       *   get:
       *     summary: Get a todo by id
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         schema:
       *           type: string
       *         required: true
       *         description: The todo id
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
      router.get("/:id", async (req: Request, res: Response) => {
            try {
                  const todo = await todoService.getTodoById(req.params.id);
                  if (!todo) {
                        res.status(404).json({ message: "Todo not found" });
                  } else {
                        res.json(todo);
                  }
            } catch (error: any) {
                  res.status(500).json({ error: error.message });
            }
      });

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
       *             type: object
       *             properties:
       *               title:
       *                 type: string
       *             required:
       *               - title
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
      router.post("/", async (req: Request, res: Response) => {
            try {
                  const { title } = req.body;
                  const newTodo = await todoService.createTodo(title);
                  res.status(201).json(newTodo);
            } catch (error: any) {
                  res.status(500).json({ error: error.message });
            }
      });

      /**
       * @swagger
       * /todos/{id}:
       *   put:
       *     summary: Update an existing todo
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         schema:
       *           type: string
       *         required: true
       *         description: The todo id
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               title:
       *                 type: string
       *               completed:
       *                 type: boolean
       *             required:
       *               - title
       *               - completed
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
      router.put("/:id", async (req: Request, res: Response) => {
            try {
                  const { title, completed } = req.body;
                  const updatedTodo = await todoService.updateTodo(req.params.id, title, completed);
                  res.json(updatedTodo);
            } catch (error: any) {
                  res.status(500).json({ error: error.message });
            }
      });

      /**
       * @swagger
       * /todos/{id}:
       *   delete:
       *     summary: Delete a todo
       *     tags: [Todos]
       *     parameters:
       *       - in: path
       *         name: id
       *         schema:
       *           type: string
       *         required: true
       *         description: The todo id
       *     responses:
       *       204:
       *         description: Todo deleted successfully.
       *       500:
       *         description: Server error.
       */
      router.delete("/:id", async (req: Request, res: Response) => {
            try {
                  await todoService.deleteTodo(req.params.id);
                  res.status(204).send();
            } catch (error: any) {
                  res.status(500).json({ error: error.message });
            }
      });

      return router;
}
