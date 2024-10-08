import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724016229869 implements MigrationInterface {
  name = 'Migration1724016229869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "affiliate" ADD "language" character varying NOT NULL DEFAULT 'en'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "language" character varying NOT NULL DEFAULT 'en'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD "language" character varying NOT NULL DEFAULT 'en'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "language"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "language"`);
    await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "language"`);
  }
}
