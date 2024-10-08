import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727960156719 implements MigrationInterface {
  name = 'Migration1727960156719';

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "profile" ADD "uploadsPerWeek" integer NOT NULL DEFAULT '0'`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP COLUMN "uploadsPerWeek"`,
    );
  }
}
