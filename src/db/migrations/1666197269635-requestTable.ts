import { MigrationInterface, QueryRunner } from "typeorm";

export class requestTable1666197269635 implements MigrationInterface {
    name = 'requestTable1666197269635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request" ("id" BIGSERIAL NOT NULL, "table_name" character varying NOT NULL, "response_id" integer, "table_id" bigint, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_d4a6b42be82b014fd71a86bcfcc" FOREIGN KEY ("table_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_d4a6b42be82b014fd71a86bcfcc"`);
        await queryRunner.query(`DROP TABLE "request"`);
    }

}
