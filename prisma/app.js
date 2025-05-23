const express = require('express');
const prisma = require('./src/config/database');

const app = express();
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/users', async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: req.body,
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/users/:id', async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(req.params.id) },
		});
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));