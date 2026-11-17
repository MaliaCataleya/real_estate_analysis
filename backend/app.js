const express = require('express');
const { Pool } = require("pg");
const cors = require('cors');

/* const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
}); */

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
});

console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);
console.log("POSTGRES_DB:", process.env.POSTGRES_DB);

module.exports = pool;

app.get('/api/locations/:id', async (req, res) => {
    try {
        const locationId = req.params.id;

        const result = await pool.query(
            'SELECT * FROM new_taipei WHERE district = $1',
            [locationId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error: Location details could not be queried!' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});