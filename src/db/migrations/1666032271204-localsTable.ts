import { MigrationInterface, QueryRunner } from 'typeorm';

export class localsTable1666032271204 implements MigrationInterface {
  name = 'localsTable1666032271204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "locals" ("id" BIGSERIAL NOT NULL, "ltc_account" character varying(50), "ltf_account" character varying(50), "name" character varying(255) NOT NULL, "email" character varying(255), "nif" character varying(50) NOT NULL, "address" character varying(255), "zipcode" character varying(50), "city" character varying(50), "country" character varying(50), "phone" character varying(50), "email_planning" character varying(255), "sirapaid" character varying(50), "area" character varying(255), "main_site_code" character varying(25), "site_code" character varying(25), "search_name" character varying(255), "contact_name" character varying(55), "contact_cargo" character varying(55), "contact_phone" character varying(55), "blocked" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT false, "sync_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56d0b7be926a53ceddcfe4abb1a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "locals"`);
  }
}
