import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('vouch')
    .addColumn('uri', 'varchar', (col) => col.primaryKey())
    .addColumn('cid', 'varchar', (col) => col.notNull())
    .addColumn('creator', 'varchar', (col) => col.notNull())
    .addColumn('subjectDid', 'varchar', (col) => col.notNull())
    .addColumn('relationship', 'varchar', (col) => col.notNull())
    .addColumn('createdAt', 'varchar', (col) => col.notNull())
    .addColumn('indexedAt', 'varchar', (col) => col.notNull())
    .addColumn('sortAt', 'varchar', (col) =>
      col
        .generatedAlwaysAs(sql`least("createdAt", "indexedAt")`)
        .stored()
        .notNull(),
    )
    .execute()

  await db.schema
    .createIndex('vouch_subjectdid_idx')
    .on('vouch')
    .column('subjectDid')
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('vouch_subjectdid_idx').execute()
  await db.schema.dropTable('vouch').execute()
}
