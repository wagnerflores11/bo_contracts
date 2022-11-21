import { MigrationInterface, QueryRunner } from 'typeorm';

export class accountTable1666032047510 implements MigrationInterface {
  name = 'accountTable1666032047510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "accounts" ("id" BIGSERIAL NOT NULL, "customer_account" character varying, "supplier_account" character varying, "name" character varying NOT NULL, "nif" character varying NOT NULL, "email" character varying, "phone" character varying, "address" character varying, "zipcode" character varying(50), "city" character varying(50), "is_customer" boolean NOT NULL DEFAULT false, "is_supplier" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT false, "blocked_for_new_orders" boolean NOT NULL DEFAULT false, "sync_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
