import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722710005622 implements MigrationInterface {
  name = 'Migration1722710005622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "supporterStatus" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP COLUMN "supporterStatus"`,
    );
  }
}
