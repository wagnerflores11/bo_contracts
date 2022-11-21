import { MigrationInterface, QueryRunner } from 'typeorm';

export class contractsTable1666032432144 implements MigrationInterface {
  name = 'contractsTable1666032432144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "contracts" ("id" BIGSERIAL NOT NULL, "contract" character varying, "line" character varying, "subcontract" character varying, "type" character varying, "type_option" character varying, "description" character varying, "unit_code" character varying, "qty" character varying, "posting_type" character varying, "posting_account" character varying, "posting_lt_account" character varying, "business_type" character varying, "business_account" character varying, "business_lt_account" character varying, "salesperson" character varying, "order_code" character varying, "quality_code" character varying, "delivery_code" character varying, "our_ref" character varying, "your_ref" character varying, "external_doc" character varying, "location_code" character varying, "sync_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "CIR" character varying NOT NULL DEFAULT '', "CIRDsg" character varying NOT NULL DEFAULT '', "LER" character varying NOT NULL DEFAULT '', "CAR" character varying NOT NULL DEFAULT '', "disposalFDAccount" character varying NOT NULL DEFAULT '', "disposalLTFAccount" character varying NOT NULL DEFAULT '', "RDProcess" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contracts"`);
  }
}
