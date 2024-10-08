import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728161598588 implements MigrationInterface {
  name = 'Migration1728161598588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD CONSTRAINT "UQ_ef6075ea8b882d0e6e7c4a07913" UNIQUE ("profileId", "affiliateId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD CONSTRAINT "UQ_0cba2afc1838248a9d4857cdf72" UNIQUE ("profileId", "questId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD CONSTRAINT "UQ_1a3f292b156b5d27548f49d00a0" UNIQUE ("profileId", "couponId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP CONSTRAINT "UQ_1a3f292b156b5d27548f49d00a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP CONSTRAINT "UQ_0cba2afc1838248a9d4857cdf72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP CONSTRAINT "UQ_ef6075ea8b882d0e6e7c4a07913"`,
    );
  }
}
