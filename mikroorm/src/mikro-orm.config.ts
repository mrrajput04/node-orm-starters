import { Options } from '@mikro-orm/core';
import { User } from './entities/User';

const config: Options = {
	entities: [User],
	dbName: 'myapp_db',
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	debug: true,
};

export default config;