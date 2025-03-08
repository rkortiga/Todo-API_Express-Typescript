/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateTodoDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         completed:
 *           type: boolean
 *       required:
 *         - title
 *         - completed
 */
export interface UpdateTodoDto {
      title: string;
      completed: boolean;
}
