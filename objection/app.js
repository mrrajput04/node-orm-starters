const express = require('express');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
	try {
		const users = await User.query();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/users', async (req, res) => {
	try {
		const user = await User.query().insert(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));