import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("questions")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("text", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("options")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("question_id", "integer", (col) => col.references("questions.id").onDelete("cascade").notNull())
    .addColumn("text", "varchar", (col) => col.notNull())
    .addColumn("is_right", "boolean", (col) => col.notNull())
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("options").execute();
  await db.schema.dropTable("questions").execute();
}
