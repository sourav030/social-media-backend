const { Pool } = require("pg");
require("dotenv").config();

/**
 * Database setup script
 * This script creates the database tables and seeds initial data
 */

const setupDatabase = async () => {
	const pool = new Pool({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});

	try {
		console.log("Setting up database...");

		// Read and execute schema file
		const fs = require("fs");
		const path = require("path");

		const schemaSQL = fs.readFileSync(
			path.join(__dirname, "../sql/schema.sql"),
			"utf8"
		);
		await pool.query(schemaSQL);
		console.log("Database schema created successfully");

		console.log("Database setup completed successfully!");
	} catch (error) {
		console.error("Database setup failed!", error);
		process.exit(1);
	} finally {
		await pool.end();
	}
};

// Run setup if called directly
if (require.main === module) {
	setupDatabase();
}

module.exports = { setupDatabase };
