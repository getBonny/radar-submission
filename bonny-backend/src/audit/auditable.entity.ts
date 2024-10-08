import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Auditable {
  @Column({ default: 'anonymous' })
  createdBy: string;
  @Column({ default: 'anonymous' })
  updatedBy: string;
  @Column()
  @CreateDateColumn()
  createdOn: Date;
  @Column()
  @UpdateDateColumn()
  updatedOn: Date;
}
