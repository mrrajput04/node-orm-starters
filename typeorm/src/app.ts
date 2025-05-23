import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database';
import { User } from './entities/User';

const app = express();
app.use(express.json());

// Initialize database
AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization:', err);
	});

// Routes
app.get('/users', async (req, res) => {
	try {
		const userRepository = AppDataSource.getRepository(User);
		const users = await userRepository.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

app.post('/users', async (req, res) => {
	try {
		const userRepository = AppDataSource.getRepository(User);
		const user = userRepository.create(req.body);
		const result = await userRepository.save(user);
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));