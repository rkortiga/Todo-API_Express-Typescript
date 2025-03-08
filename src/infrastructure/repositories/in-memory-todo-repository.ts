import { Todo } from '../../domain/entities/todo';
import { v4 as uuidv4 } from 'uuid';
import { ITodoRepository } from '../../domain/interfaces/todo-repository.interface';

export class InMemoryTodoRepository implements ITodoRepository {
      private todos: Todo[] = [];

      async getAll(): Promise<Todo[]> {
            return this.todos;
      }

      async getById(id: string): Promise<Todo | null> {
            return this.todos.find(todo => todo.id === id) || null;
      }

      async create(todo: Todo): Promise<Todo> {
            todo.id = uuidv4();
            this.todos.push(todo);
            return todo;
      }

      async update(todo: Todo): Promise<Todo> {
            const index = this.todos.findIndex(t => t.id === todo.id);
            if (index === -1) {
                  throw new Error('Todo not found');
            }
            this.todos[index] = todo;
            return todo;
      }

      async delete(id: string): Promise<void> {
            this.todos = this.todos.filter(todo => todo.id !== id);
      }
}
