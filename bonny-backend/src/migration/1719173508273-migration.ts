import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1719173508273 implements MigrationInterface {
  name = 'Migration1719173508273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "affiliate" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reclaim" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stats" ADD "createdBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "stats" ADD "updatedBy" character varying NOT NULL DEFAULT 'anonymous'`,
    );
    await queryRunner.query(
      `ALTER TABLE "stats" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stats" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "reclaim" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "reclaim" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "reclaim" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "reclaim" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdBy"`);
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "updatedOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "createdOn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "updatedOn"`);
    await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "createdOn"`);
    await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "createdBy"`);
  }
}
