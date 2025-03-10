import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Todos'})
export class TodoSchema {
      @PrimaryGeneratedColumn('uuid')
      id!: string;

      @Column({type: 'nvarchar', length: 255})
      title!: string;

      @Column({type: 'bit'})
      completed!: boolean;
}
