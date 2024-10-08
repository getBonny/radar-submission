import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receipt } from '../receipt/receipt.entity';
import { Profile } from '../profile/profile.entity';
import { QuestStatus } from '../quest/quest.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Transaction extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  status: string;
  @Column({ type: 'float' })
  tokens: number;
  @Column({ default: new Date() })
  timestamp: Date;
  @Column()
  blockchainTxId: string;
  @OneToOne(() => Receipt, (receipt) => receipt.transactions, {
    nullable: true,
  })
  receipt: Receipt;
  @OneToOne(() => QuestStatus, (status) => status.transaction, {
    nullable: true,
  })
  questStatus: QuestStatus;
  @ManyToOne(() => Profile, (profile) => profile.transactions)
  profile: Profile;
}
