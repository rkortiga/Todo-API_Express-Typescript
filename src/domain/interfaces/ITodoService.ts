import { Todo } from '../entities/Todo';
import { CreateTodoDto } from '../dtos/CreateTodoDto';
import { UpdateTodoDto } from '../dtos/UpdateTodoDto';

export interface ITodoService {
      getAllTodos(): Promise<Todo[]>;

      getTodoById(id: string): Promise<Todo | null>;

      createTodo(dto: CreateTodoDto): Promise<Todo>;

      updateTodo(id: string, dto: UpdateTodoDto): Promise<Todo>;

      deleteTodo(id: string): Promise<void>;
}
