---
to: packages/core/lib/db/migrations/<%= Date.now() %>_<%= name.replace(/\s/g, "_") %>.js
---
import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
}
