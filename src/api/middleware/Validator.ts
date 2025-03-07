import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, validationResult } from 'express-validator';

export class Validator {

      static validateCreateTodo: RequestHandler[] = [
            body('title')
                  .isString().withMessage('The title field must be a string representing the todo description.')
                  .notEmpty().withMessage('The title field is required and cannot be empty.') as unknown as RequestHandler,
            (req: Request, res: Response, next: NextFunction) => {
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                        res.status(400).json({errors: errors.array()});
                        return;
                  }
                  next();
            }
      ];

      static validateUpdateTodo: RequestHandler[] = [
            body('title')
                  .isString().withMessage('The title field must be a string representing the todo description.')
                  .notEmpty().withMessage('The title field is required and cannot be empty.') as unknown as RequestHandler,
            body('completed')
                  .isBoolean().withMessage('The completed field must be a boolean value (true or false) indicating the completion status.') as unknown as RequestHandler,
            (req: Request, res: Response, next: NextFunction) => {
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                        res.status(400).json({errors: errors.array()});
                        return;
                  }
                  next();
            }
      ];
}
