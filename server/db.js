require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: "swmqrsqe",
    password: "t9bpCGZSUJ4gef3P9oIh-WTMYChstDG7",
    host: "satao.db.elephantsql.com",
    port: 5432,
    database: "swmqrsqe"
});

// Function to create the candidates table if it doesn't exist
const createTable = async () => {
    try {
        const client = await pool.connect();
        // SQL query to create the candidates table
        const query = `
            CREATE TABLE IF NOT EXISTS candidates (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                skills TEXT,
                status VARCHAR(50),
                expected_salary NUMERIC(10, 2),
                nodejs_experience_category VARCHAR(50),
                reactjs_experience_category VARCHAR(50)
            )
        `;
        // Execute the query
        await client.query(query);
        console.log('Table created successfully');
        // Release the client back to the pool
        client.release();
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

// Call the createTable function to create the table when the server starts
createTable();

module.exports = pool;
