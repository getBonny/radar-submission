import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Affiliate extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 'en' })
  language: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  imageUrl: string;
  @Column()
  externalUrl: string;
  @OneToMany(
    () => AffiliateStatus,
    (affiliateStatus) => affiliateStatus.affiliate,
  )
  statuses: AffiliateStatus[];
}

@Entity()
@Unique(['profile', 'affiliate'])
export class AffiliateStatus extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.affiliateStatuses)
  profile: Profile;
  @ManyToOne(() => Affiliate, (affiliate) => affiliate.statuses)
  affiliate: Affiliate;
  @Column()
  status: string;
  @Column()
  purchaseDate: Date;
}
