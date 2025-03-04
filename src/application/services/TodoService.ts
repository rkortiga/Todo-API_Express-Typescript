import { ITodoRepository } from '../../domain/interfaces/ITodoRepository';
import { ITodoService } from '../../domain/interfaces/ITodoService';
import { Todo } from '../../domain/entities/Todo';

export class TodoService implements ITodoService {
      constructor(private todoRepository: ITodoRepository) {
      }

      async getAllTodos(): Promise<Todo[]> {
            return this.todoRepository.getAll();
      }

      async getTodoById(id: string): Promise<Todo | null> {
            return this.todoRepository.getById(id);
      }

      async createTodo(title: string): Promise<Todo> {
            const todo: Todo = {id: '', title, completed: false};
            return this.todoRepository.create(todo);
      }

      async updateTodo(id: string, title: string, completed: boolean): Promise<Todo> {
            const existingTodo = await this.todoRepository.getById(id);
            if (!existingTodo) {
                  throw new Error('Todo not found');
            }
            existingTodo.title = title;
            existingTodo.completed = completed;
            return this.todoRepository.update(existingTodo);
      }

      async deleteTodo(id: string): Promise<void> {
            return this.todoRepository.delete(id);
      }
}
