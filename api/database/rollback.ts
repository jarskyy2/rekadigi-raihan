import path from "path";
import db from "./client";
import { migrationOrder } from "./migrate";

const migrationPath = path.join(__dirname, "migrations");

const rollbackMigrations = async () => {
    for (const file of migrationOrder.reverse()) {
      const filePath = path.join(migrationPath, file);
  
      try {
        const migration = await import(filePath);
        if (migration.down) {
          console.log(`🔹 Rolling back migration: ${file}`);
          await migration.down(db);
          console.log(`✅ Rollback completed: ${file}`);
        } else {
          console.warn(`⚠️ Skipping ${file}, no "down" function found.`);
        }
      } catch (error) {
        console.error(`❌ Error rolling back migration ${file}:`, error);
        process.exit(1);
      }
    }
  
    console.log("🎉 All rollbacks completed successfully!");
    process.exit(0);
  };
  
  // Jalankan rollback
  rollbackMigrations();
  