/**
 * @description: model 与sql连接
 * @param {type} 
 */

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PostOrm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  descripation: string;
}