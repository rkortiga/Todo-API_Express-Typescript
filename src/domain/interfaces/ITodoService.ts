import { Todo } from '../entities/Todo';
import { CreateTodoDto } from '../dtos/create-todo-dto';
import { UpdateTodoDto } from '../dtos/update-todo-dto';

export interface ITodoService {
      getAllTodos(): Promise<Todo[]>;

      getTodoById(id: string): Promise<Todo | null>;

      createTodo(dto: CreateTodoDto): Promise<Todo>;

      updateTodo(id: string, dto: UpdateTodoDto): Promise<Todo>;

      deleteTodo(id: string): Promise<void>;
}
