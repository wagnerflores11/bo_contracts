import { MigrationInterface, QueryRunner } from 'typeorm';

export class localsAccountReleation1666032342031 implements MigrationInterface {
  name = 'localsAccountReleation1666032342031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "locals" ADD "accountId" bigint`);
    await queryRunner.query(
      `ALTER TABLE "locals" ADD CONSTRAINT "FK_9476a92a7e84c5ca01832d5d564" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locals" DROP CONSTRAINT "FK_9476a92a7e84c5ca01832d5d564"`,
    );
    await queryRunner.query(`ALTER TABLE "locals" DROP COLUMN "accountId"`);
  }
}
