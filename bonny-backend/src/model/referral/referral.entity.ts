import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Referral {
  @PrimaryColumn()
  refereeProfileId: string;
  @PrimaryColumn()
  referrerProfileId: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'refereeProfileId' })
  referee: Profile;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'referrerProfileId' })
  referrer: Profile;
}
