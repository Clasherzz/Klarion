import sqlite3 from "sqlite3";
import { open } from "sqlite";

// SQLite + Promises wrapper
export async function initDB() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Example table
  await db.exec(`
      CREATE TABLE IF NOT EXISTS complaints (
    complaint_id            TEXT PRIMARY KEY,
    product                 TEXT,
    sub_product             TEXT,
    issue                   TEXT,
    sub_issue               TEXT,
    complaint_what_happened TEXT,
    company                 TEXT,
    company_response        TEXT,
    company_public_response TEXT,
    submitted_via           TEXT,
    date_received           TEXT,
    date_sent_to_company    TEXT,
    state                   TEXT,
    zip_code                TEXT,
    timely                  TEXT,
    consumer_disputed       TEXT,
    consumer_consent_provided TEXT,
    has_narrative           INTEGER, 
    tags                    TEXT     
);

    
  `);

  return db;
}
