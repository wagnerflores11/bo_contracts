import { MigrationInterface, QueryRunner } from 'typeorm';

export class indexLocalsAccount1665667257134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_local_version_latest" ON "public"."locals_accounts" ("id" ASC)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_local_version_latest"`);
  }
}
