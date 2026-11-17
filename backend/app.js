const express = require('express');
const { Pool } = require("pg");
const pool = require("../database");


const app = express();
const port = 3000;

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
});

module.exports = pool;

app.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM properties LIMIT 100"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error"
        });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});