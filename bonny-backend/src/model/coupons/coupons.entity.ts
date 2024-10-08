import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Coupon extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 'en' })
  language: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  details: string;
  @Column()
  type: string;
  @Column()
  expiryDate: Date;
  @Column()
  imageUrl: string;
  @Column({ nullable: true, default: 0 })
  multiplier: number;
  @OneToMany(() => CouponStatus, (couponStatus) => couponStatus.coupon)
  statuses: CouponStatus[];
}

@Entity()
@Unique(['profile', 'coupon'])
export class CouponStatus extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Profile, (profile) => profile.couponStatuses)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
  @ManyToOne(() => Coupon, (coupon) => coupon.statuses)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;

  @Column({ nullable: false })
  profileId: string;

  @Column({ nullable: false })
  couponId: number;
  @Column()
  status: string; //redeemed, expired, ...
  @Column()
  redeemDate: Date;
}
