import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1719176135959 implements MigrationInterface {
  name = 'Migration1719176135959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim_status" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "createdBy"`);
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_option" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "createdBy"`);
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP COLUMN "createdBy"`,
    );
  }
}
