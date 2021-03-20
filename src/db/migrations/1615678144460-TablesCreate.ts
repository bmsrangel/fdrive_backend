import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesCreate1615678144460 implements MigrationInterface {
  name = 'TablesCreate1615678144460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(60) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "file_name" text NOT NULL, "file_path" text NOT NULL, "size" varchar(10) NOT NULL, "format" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_files" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "file_name" text NOT NULL, "file_path" text NOT NULL, "size" varchar(10) NOT NULL, "format" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer NOT NULL, CONSTRAINT "FK_e7603cf1f57737adec1f5248f10" FOREIGN KEY ("users_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_files"("id", "file_name", "file_path", "size", "format", "createdAt", "updatedAt", "users_id") SELECT "id", "file_name", "file_path", "size", "format", "createdAt", "updatedAt", "users_id" FROM "files"`,
    );
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`ALTER TABLE "temporary_files" RENAME TO "files"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" RENAME TO "temporary_files"`);
    await queryRunner.query(
      `CREATE TABLE "files" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "file_name" text NOT NULL, "file_path" text NOT NULL, "size" varchar(10) NOT NULL, "format" varchar(50) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "users_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "files"("id", "file_name", "file_path", "size", "format", "createdAt", "updatedAt", "users_id") SELECT "id", "file_name", "file_path", "size", "format", "createdAt", "updatedAt", "users_id" FROM "temporary_files"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_files"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
