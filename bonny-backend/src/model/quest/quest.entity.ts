import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Survey } from '../survey/survey.entity';
import { Reclaim } from '../reclaim/reclaim.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Quest extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 'en' })
  language: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @Column()
  imageUrl: string;
  @Column({ default: '' })
  externalUrl: string;
  @Column({ default: 0, type: 'float' })
  points: number;
  @Column({ default: true })
  enabled: boolean;
  @OneToMany(() => QuestStatus, (questStatus) => questStatus.quest)
  statuses: QuestStatus[];
  @OneToOne(() => Survey, (survey) => survey.quest)
  @JoinColumn()
  survey: Survey;
  @JoinColumn()
  @OneToOne(() => Reclaim, (reclaim) => reclaim.quest)
  reclaim: Reclaim;
}

@Entity()
@Unique(['profile', 'quest'])
export class QuestStatus extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.questStatuses)
  profile: Profile;
  @ManyToOne(() => Quest, (quest) => quest.statuses)
  quest: Quest;
  @Column()
  status: string;
  @Column()
  completedDate: Date;
  @JoinColumn()
  @OneToOne(() => Transaction, (transaction) => transaction.questStatus)
  transaction: Transaction;
}
