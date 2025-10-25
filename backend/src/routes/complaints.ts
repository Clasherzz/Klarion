import { Router } from "express";
import { initDB } from "../db";
import {fetchComplaintsData} from "../test";

const router = Router();

router.get("/", async (_req, res) => {
  const db = await initDB();
  const users = await db.all("SELECT * FROM complaints");
  res.json(users);
});

router.get("/complaint_info", async (req, res) => {
    try {
      const id = req.query.id as string; // e.g. /complaint?id=9998869
      if (!id) return res.status(400).json({ error: "Missing id query parameter" });
  
      const db = await initDB();
      const users = await db.all("SELECT * FROM complaints WHERE complaint_id = ?", [id]);
  
      res.json(users);
    } catch (err) {
      console.error("Error fetching complaint:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.get("/update", async (_req, res) => {
    try {
      const db = await initDB();
      const datas = await fetchComplaintsData();
  
      // Prepare the insert statement (avoid SQL injection)
      const insertStmt = await db.prepare(`
        INSERT OR IGNORE INTO complaints (
          complaint_id, product, sub_product, issue, sub_issue,complaint_what_happened,
          company, state, zip_code, date_received, date_sent_to_company,
          company_response,company_public_response, timely, consumer_disputed,
          submitted_via, consumer_consent_provided,has_narrative,tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
      `);
  
      for (const item of datas) {
        const c = item._source;
        await insertStmt.run([
          c.complaint_id,
          c.product,
          c.sub_product,
          c.issue,
          c.sub_issue,
          c.complaint_what_happened,
          c.company,
          c.state,
          c.zip_code,
          c.date_received,
          c.date_sent_to_company,
          c.company_response,
          c.company_public_response,
          c.timely,
          c.consumer_disputed,
          c.submitted_via,
          c.consumer_consent_provided,
          c.has_narrative,
          c.tags
        ]);
      }
  
      res.json({ message: `Inserted ${datas.length} complaints successfully.` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update complaints" });
    }
  });

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const db = await initDB();
  await db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
  res.json({ message: "User added successfully" });
});


export default router;
