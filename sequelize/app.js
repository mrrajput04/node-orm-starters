const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Test database connection
sequelize.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err));

// Sync models
sequelize.sync({ force: false });

// Routes
app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/users', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));