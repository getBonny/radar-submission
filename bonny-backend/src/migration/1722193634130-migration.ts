import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722193634130 implements MigrationInterface {
  name = 'Migration1722193634130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "userName" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_bbabd6ded4d5b9b20799228c951" UNIQUE ("userName")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_bbabd6ded4d5b9b20799228c951"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "userName"`);
  }
}
