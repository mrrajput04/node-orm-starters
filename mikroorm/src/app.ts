import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/User';
import config from './mikro-orm.config';

const app = express();
app.use(express.json());

let orm: MikroORM;

const initDB = async () => {
	orm = await MikroORM.init(config);
	await orm.getSchemaGenerator().updateSchema();
};

// Routes
app.get('/users', async (req, res) => {
	try {
		const users = await orm.em.find(User, {});
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

app.post('/users', async (req, res) => {
	try {
		const user = new User();
		Object.assign(user, req.body);
		await orm.em.persistAndFlush(user);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

initDB().then(() => {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});