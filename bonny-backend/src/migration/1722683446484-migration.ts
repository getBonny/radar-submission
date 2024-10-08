import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1722683446484 implements MigrationInterface {
  name = 'Migration1722683446484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "referral" ("refereeProfileId" character varying NOT NULL, "referrerProfileId" character varying NOT NULL, CONSTRAINT "PK_0c6189f80a19a6547262c08bef5" PRIMARY KEY ("refereeProfileId", "referrerProfileId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral" ADD CONSTRAINT "FK_2ee1ef2d27f9cb5c2b9c3f21ee8" FOREIGN KEY ("refereeProfileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral" ADD CONSTRAINT "FK_090db8a14c3cc37b83f09f316b3" FOREIGN KEY ("referrerProfileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "referral" DROP CONSTRAINT "FK_090db8a14c3cc37b83f09f316b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral" DROP CONSTRAINT "FK_2ee1ef2d27f9cb5c2b9c3f21ee8"`,
    );
    await queryRunner.query(`DROP TABLE "referral"`);
  }
}
