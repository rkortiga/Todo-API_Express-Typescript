/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTodoDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *       required:
 *         - title
 */
export interface CreateTodoDto {
      title: string;
}
