import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("answers")
    .addColumn("user_alias", "varchar", (col) => col.notNull())
    .addColumn("question_id", "integer", (col) => col.notNull().references("questions.id").onDelete("cascade").notNull())
    .addColumn("option_id", "integer", (col) => col.references("options.id").onDelete("cascade").notNull())
    .addColumn("added_seconds", "integer", (col) => col.notNull().defaultTo(0))
    .addPrimaryKeyConstraint("answers_pk", ["user_alias", "question_id"])
    .execute();

  await db.schema
    .createIndex("answers_by_user_index")
    .on("answers")
    .column("user_alias")
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("answers_by_user_index").execute()
  await db.schema.dropTable("answers").execute()
}
