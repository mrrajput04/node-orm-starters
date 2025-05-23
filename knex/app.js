const express = require('express');
const db = require('./config/database');

const app = express();
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
	try {
		const users = await db('users').select('*');
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/users', async (req, res) => {
	try {
		const [id] = await db('users').insert(req.body);
		const user = await db('users').where({ id }).first();
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));