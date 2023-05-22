import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("questions")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("text", "varchar")
    .execute();

  await db.schema
    .createTable("answers")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("question_id", "integer", (col) => col.references("questions.id").onDelete("cascade"))
    .addColumn("text", "varchar")
    .addColumn("is_right", "boolean")
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("answers").execute();
  await db.schema.dropTable("questions").execute();
}
