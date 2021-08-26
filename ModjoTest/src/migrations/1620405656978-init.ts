import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1620405656978 implements MigrationInterface {
  name = 'init1620405656978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "callId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "call" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "date" datetime NOT NULL, "duration" integer NOT NULL, "crmActivityId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "callId" integer NOT NULL, CONSTRAINT "FK_539c623efeada730efc6d6ba68e" FOREIGN KEY ("callId") REFERENCES "call" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_comment"("id", "callId") SELECT "id", "callId" FROM "comment"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_comment" RENAME TO "comment"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME TO "temporary_comment"`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "callId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "comment"("id", "callId") SELECT "id", "callId" FROM "temporary_comment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_comment"`);
    await queryRunner.query(`DROP TABLE "call"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
