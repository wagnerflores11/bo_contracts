import { MigrationInterface, QueryRunner } from 'typeorm';

export class localsAccountView1666032389566 implements MigrationInterface {
  name = 'localsAccountView1666032389566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "locals_accounts" AS SELECT "locals"."id" AS "id", "locals"."name" AS "name", "locals"."nif" AS "nif", "locals"."address" AS "address", "locals"."zipcode" AS "zipcode", "locals"."city" AS "city", "locals"."country" AS "country", "locals"."active" AS "active", "accounts"."id" AS "account_id", "accounts"."customer_account" AS "account_customer_account", "accounts"."supplier_account" AS "account_supplier_account", "accounts"."name" AS "account_name", "accounts"."email" AS "account_email", "accounts"."address" AS "account_address", "accounts"."zipcode" AS "account_zipcode", "accounts"."city" AS "account_city", "locals"."ltc_account" AS "ltc_account" FROM "locals" "locals" LEFT JOIN "accounts" "accounts" ON "accounts"."id" = "locals"."accountId"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'locals_accounts',
        'SELECT "locals"."id" AS "id", "locals"."name" AS "name", "locals"."nif" AS "nif", "locals"."address" AS "address", "locals"."zipcode" AS "zipcode", "locals"."city" AS "city", "locals"."country" AS "country", "locals"."active" AS "active", "accounts"."id" AS "account_id", "accounts"."customer_account" AS "account_customer_account", "accounts"."supplier_account" AS "account_supplier_account", "accounts"."name" AS "account_name", "accounts"."email" AS "account_email", "accounts"."address" AS "account_address", "accounts"."zipcode" AS "account_zipcode", "accounts"."city" AS "account_city", "locals"."ltc_account" AS "ltc_account" FROM "locals" "locals" LEFT JOIN "accounts" "accounts" ON "accounts"."id" = "locals"."accountId"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'locals_accounts', 'public'],
    );
    await queryRunner.query(`DROP VIEW "locals_accounts"`);
  }
}
