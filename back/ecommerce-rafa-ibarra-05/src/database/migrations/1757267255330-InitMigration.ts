import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1757267255330 implements MigrationInterface {
    name = 'InitMigration1757267255330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmi"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmi" boolean NOT NULL DEFAULT false`);
    }

}
