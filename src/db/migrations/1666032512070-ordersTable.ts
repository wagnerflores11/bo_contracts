import { MigrationInterface, QueryRunner } from 'typeorm';

export class ordersTable1666032512070 implements MigrationInterface {
  name = 'ordersTable1666032512070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "orders" ("id" BIGSERIAL NOT NULL, "number" integer NOT NULL, "status" character varying NOT NULL, "start_restriction" date, "end_restriction" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "local_id" bigint, "contract_id" bigint, "additional_contract_id" bigint, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_b325a60022de3d496c8633581db" FOREIGN KEY ("local_id") REFERENCES "locals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_6ed346f1179ae378edebb567b13" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_30284f94b8787749d36d360371e" FOREIGN KEY ("additional_contract_id") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_30284f94b8787749d36d360371e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_6ed346f1179ae378edebb567b13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_b325a60022de3d496c8633581db"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
