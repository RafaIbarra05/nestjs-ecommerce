import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1757017770069 implements MigrationInterface {
  name = 'InitMigration1757017770069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer, "country" character varying(50), "address" text, "city" character varying(50), "isAdmi" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "order_detail_id" uuid, "user_id" uuid, CONSTRAINT "REL_aabcd310c52b17f0ee0c97a1c8" UNIQUE ("order_detail_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png', "categoryId" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_products_products" ("orderDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_2c6c921128319f110abec51e06b" PRIMARY KEY ("orderDetailsId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_35bbcf9515eab2382bd417b385" ON "order_details_products_products" ("orderDetailsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df657e601f53f706e4b7d253c3" ON "order_details_products_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_aabcd310c52b17f0ee0c97a1c8a" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" ADD CONSTRAINT "FK_35bbcf9515eab2382bd417b385f" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" ADD CONSTRAINT "FK_df657e601f53f706e4b7d253c30" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_df657e601f53f706e4b7d253c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_35bbcf9515eab2382bd417b385f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_aabcd310c52b17f0ee0c97a1c8a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df657e601f53f706e4b7d253c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35bbcf9515eab2382bd417b385"`,
    );
    await queryRunner.query(`DROP TABLE "order_details_products_products"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
