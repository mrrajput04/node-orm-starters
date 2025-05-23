const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME || 'myapp_db',
	process.env.DB_USER || 'root',
	process.env.DB_PASSWORD || 'password',
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: 'mysql', // or 'postgres'
		logging: false,
	}
);

module.exports = sequelize;