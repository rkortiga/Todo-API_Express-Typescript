import { v4 as uuidv4 } from 'uuid';
import { ITodoRepository } from '../../domain/interfaces/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';
import sql from 'mssql';
import { DatabaseConfig } from '../configurations/DatabaseConfig';

export class TodoRepository implements ITodoRepository {

      private connectionPool: sql.ConnectionPool;

      constructor() {
            this.connectionPool = new sql.ConnectionPool(DatabaseConfig);
            this.connectionPool.connect().catch((err) =>
                  console.error('SQL Server connection failed: ', err)
            );
      }

      async getAll(): Promise<Todo[]> {
            try {
                  const result = await this.connectionPool.request().query(
                        'SELECT id, title, completed FROM Todos'
                  );
                  return result.recordset.map((row: any) => ({
                        id: row.id,
                        title: row.title,
                        completed: row.completed
                  }));
            } catch (err) {
                  console.error(err);
                  throw err;
            }
      }

      async getById(id: string): Promise<Todo | null> {
            try {
                  const result = await this.connectionPool
                        .request()
                        .input('id', sql.UniqueIdentifier, id)
                        .query('SELECT id, title, completed FROM Todos WHERE id = @id');
                  if (result.recordset.length > 0) {
                        return result.recordset[0];
                  }
                  return null;
            } catch (err) {
                  console.error(err);
                  throw err;
            }
      }

      async create(todo: Todo): Promise<Todo> {
            try {
                  todo.id = uuidv4();
                  await this.connectionPool
                        .request()
                        .input('id', sql.UniqueIdentifier, todo.id)
                        .input('title', sql.NVarChar, todo.title)
                        .input('completed', sql.Bit, todo.completed)
                        .query(
                              'INSERT INTO Todos (id, title, completed) VALUES (@id, @title, @completed)'
                        );
                  return todo;
            } catch (err) {
                  console.error(err);
                  throw err;
            }
      }

      async update(todo: Todo): Promise<Todo> {
            try {
                  await this.connectionPool
                        .request()
                        .input('id', sql.UniqueIdentifier, todo.id)
                        .input('title', sql.NVarChar, todo.title)
                        .input('completed', sql.Bit, todo.completed)
                        .query(
                              'UPDATE Todos SET title = @title, completed = @completed WHERE id = @id'
                        );
                  return todo;
            } catch (err) {
                  console.error(err);
                  throw err;
            }
      }

      async delete(id: string): Promise<void> {
            try {
                  await this.connectionPool
                        .request()
                        .input('id', sql.UniqueIdentifier, id)
                        .query('DELETE FROM Todos WHERE id = @id');
            } catch (err) {
                  console.error(err);
                  throw err;
            }
      }
}
