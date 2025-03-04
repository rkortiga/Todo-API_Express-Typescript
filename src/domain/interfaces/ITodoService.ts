import { Todo } from '../entities/Todo';

export interface ITodoService {
      getAllTodos(): Promise<Todo[]>;

      getTodoById(id: string): Promise<Todo | null>;

      createTodo(title: string): Promise<Todo>;

      updateTodo(id: string, title: string, completed: boolean): Promise<Todo>;

      deleteTodo(id: string): Promise<void>;
}
