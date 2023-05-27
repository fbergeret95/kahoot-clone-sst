import { Kysely } from "kysely";
/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("username", "varchar", (col) => col.notNull().unique())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("sub", "varchar", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("answers")
    .addColumn("username", "varchar", (col) => col.notNull().references("users.username").onDelete("cascade"))
    .addColumn("question_id", "integer", (col) => col.notNull().references("questions.id").onDelete("cascade").notNull())
    .addColumn("option_id", "integer", (col) => col.references("options.id").onDelete("cascade").notNull())
    .addColumn("seconds", "integer", (col) => col.notNull().defaultTo(0))
    .addPrimaryKeyConstraint("answers_pk", ["username", "question_id"])
    .execute();

  await db.schema
    .createIndex("answers_by_user_index")
    .on("answers")
    .column("username")
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex("answers_by_user_index").execute()
  await db.schema.dropTable("answers").execute()
  await db.schema.dropTable("users").execute()
}
