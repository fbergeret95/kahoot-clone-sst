import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("control")
    .addColumn("id", "integer", col => col.primaryKey())
    .addColumn("start", "timestamp")
    .addColumn("end", "timestamp")
    .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("control").execute()
}
