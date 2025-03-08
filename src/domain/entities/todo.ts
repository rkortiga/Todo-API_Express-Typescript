/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         completed:
 *           type: boolean
 *       required:
 *         - title
 */
export interface Todo {
      id: string;
      title: string;
      completed: boolean;
}
