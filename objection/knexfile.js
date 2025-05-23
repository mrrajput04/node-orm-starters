module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'password',
			database: 'myapp_db'
		},
		migrations: {
			directory: './migrations'
		},
		seeds: {
			directory: './seeds'
		}
	}
};