import {
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Quest } from '../quest/quest.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Reclaim extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => ReclaimStatus, (reclaimStatus) => reclaimStatus.reclaim)
  statuses: ReclaimStatus[];
  @OneToOne(() => Quest, (quest) => quest.reclaim)
  quest: Quest;
}

@Entity()
export class ReclaimStatus extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.questStatuses)
  profile: Profile;
  @ManyToOne(() => Reclaim, (reclaim) => reclaim.statuses)
  reclaim: Reclaim;
}
