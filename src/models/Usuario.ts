import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EUsuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  contraseña!: string;

  @Column()
  rol!: string;
}

export interface Usuario {
    id:number;
    username:string;
    contraseña:string;
    rol:string;
}