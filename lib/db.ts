import { Client } from "pg";

// Database connection configuration
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database
client.connect().catch((err) => {
  console.error("Database connection error:", err);
});

export { client };
