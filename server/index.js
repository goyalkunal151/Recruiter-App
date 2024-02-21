require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// Error handler middleware
const errorHandler = (res, error) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Routes

// Route to create a new candidate
app.post('/candidates', async (req, res) => {
    try {
        const { name, email, phone, skills, status, expected_salary, nodejs_experience_category, reactjs_experience_category } = req.body;
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO candidates (name, email, phone, skills, status, expected_salary, nodejs_experience_category, reactjs_experience_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, email, phone, skills, status, expected_salary, nodejs_experience_category, reactjs_experience_category]
        );
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Route to get all candidates with computed score
app.get('/candidates', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT * FROM candidates
        `);
        client.release();
        res.json(result.rows);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Route to get a candidate by ID
app.get('/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const result = await client.query(`
            SELECT * FROM candidates WHERE id = $1', [id]
        `);
        client.release();
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Route to update a candidate by ID
app.put('/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const client = await pool.connect();
        const result = await client.query('UPDATE candidates SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
        client.release();
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        errorHandler(res, error);
    }
});

// Route to delete a candidate by ID
app.delete('/candidates/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await pool.connect();
        const result = await client.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);
        client.release();
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        errorHandler(res, error);
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("server has started on port 4000");
});
