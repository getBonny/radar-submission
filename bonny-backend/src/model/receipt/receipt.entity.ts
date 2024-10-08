import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Receipt extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  storageUrl: string;
  @Column()
  supplierName: string;
  @Column({ type: 'float' })
  totalAmount: number;
  @Column({ nullable: true })
  receiptDate: Date;
  @Column()
  hash: string;
  @JoinColumn()
  @OneToOne(() => Transaction, (transaction) => transaction.receipt)
  transactions: Transaction;
}
