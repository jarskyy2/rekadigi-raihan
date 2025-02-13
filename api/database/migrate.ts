import path from "path";
import db from "./client";

export const migrationOrder = [
    'create_customer_table.ts',
    'create_product_table.ts',
    'create_transaction_table.ts',
    'create_transactiondetail_table.ts',
];

const migrationPath = path.join(__dirname, "migrations");

const runMigrations = async () => {
  for (const file of migrationOrder) {
    const filePath = path.join(migrationPath, file);

    try {
      const migration = await import(filePath);
      if (migration.up) {
        console.log(`Running migration: ${file}`);
        await migration.up(db);
        console.log(`✅ Migration completed: ${file}`);
      } else {
        console.warn(`⚠️ Skipping ${file}, no "up" function found.`);
      }
    } catch (error) {
      console.error(`❌ Error running migration ${file}:`, error);
      process.exit(1);
    }
  }

  console.log("✅ All migrations completed successfully!");
  process.exit(0);
};

runMigrations();