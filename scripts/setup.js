const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

async function setup() {
	console.log(chalk.blue.bold('\n🚀 ORM Starter Templates Setup\n'));

	// Check if .env exists
	const envPath = path.join(__dirname, '..', '.env');
	const envExamplePath = path.join(__dirname, '..', '.env.example');

	if (!fs.existsSync(envPath)) {
		if (fs.existsSync(envExamplePath)) {
			await fs.copy(envExamplePath, envPath);
			console.log(chalk.green('✅ Created .env file from template'));
		} else {
			await createEnvFile(envPath);
		}
	}

	// Import inquirer dynamically
	const inquirer = (await import('inquirer')).default;

	// Database setup prompts
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'dbHost',
			message: 'Database host:',
			default: 'localhost'
		},
		{
			type: 'input',
			name: 'dbPort',
			message: 'Database port:',
			default: '3306'
		},
		{
			type: 'input',
			name: 'dbUser',
			message: 'Database username:',
			default: 'root'
		},
		{
			type: 'password',
			name: 'dbPassword',
			message: 'Database password:',
			mask: '*'
		},
		{
			type: 'input',
			name: 'dbName',
			message: 'Database name:',
			default: 'orm_templates_db'
		},
		{
			type: 'input',
			name: 'mongoUri',
			message: 'MongoDB URI:',
			default: 'mongodb://localhost:27017/orm_templates_db'
		}
	]);

	// Update .env file
	const spinner = ora('Updating environment configuration...').start();
	await updateEnvFile(envPath, answers);
	spinner.succeed('Environment configuration updated');

	// Setup TypeScript projects
	await setupTypeScriptProjects();

	console.log(chalk.green.bold('\n✅ Setup completed successfully!\n'));
	console.log(chalk.yellow('Next steps:'));
	console.log(chalk.white('1. Run migrations: npm run setup:migrations'));
	console.log(chalk.white('2. Seed data: npm run seed-all'));
	console.log(chalk.white('3. Start any ORM: npm run sequelize (or mongoose, typeorm, etc.)'));
	console.log(chalk.white('4. View menu: npm start'));
}

async function createEnvFile(envPath) {
	const envContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=orm_templates_db

# MongoDB
MONGO_URI=mongodb://localhost:27017/orm_templates_db

# Prisma
DATABASE_URL="mysql://root:@localhost:3306/orm_templates_db"

# Application
NODE_ENV=development
PORT=3000

# JWT (if needed)
JWT_SECRET=your-secret-key-here
`;

	await fs.writeFile(envPath, envContent);
}

async function updateEnvFile(envPath, answers) {
	let envContent = await fs.readFile(envPath, 'utf8');

	envContent = envContent.replace(/DB_HOST=.*/, `DB_HOST=${answers.dbHost}`);
	envContent = envContent.replace(/DB_PORT=.*/, `DB_PORT=${answers.dbPort}`);
	envContent = envContent.replace(/DB_USER=.*/, `DB_USER=${answers.dbUser}`);
	envContent = envContent.replace(/DB_PASSWORD=.*/, `DB_PASSWORD=${answers.dbPassword}`);
	envContent = envContent.replace(/DB_NAME=.*/, `DB_NAME=${answers.dbName}`);
	envContent = envContent.replace(/MONGO_URI=.*/, `MONGO_URI=${answers.mongoUri}`);

	const databaseUrl = `mysql://${answers.dbUser}:${answers.dbPassword}@${answers.dbHost}:${answers.dbPort}/${answers.dbName}`;
	envContent = envContent.replace(/DATABASE_URL=.*/, `DATABASE_URL="${databaseUrl}"`);

	await fs.writeFile(envPath, envContent);
}

async function setupTypeScriptProjects() {
	const spinner = ora('Setting up TypeScript configurations...').start();

	const tsProjects = ['typeorm', 'mikroorm'];

	for (const project of tsProjects) {
		const tsConfigPath = path.join(__dirname, '..', project, 'tsconfig.json');
		if (!fs.existsSync(tsConfigPath)) {
			const tsConfig = {
				"compilerOptions": {
					"target": "ES2020",
					"module": "commonjs",
					"lib": ["ES2020"],
					"outDir": "./dist",
					"rootDir": "./src",
					"strict": true,
					"esModuleInterop": true,
					"skipLibCheck": true,
					"forceConsistentCasingInFileNames": true,
					"experimentalDecorators": true,
					"emitDecoratorMetadata": true,
					"resolveJsonModule": true
				},
				"include": ["src/**/*"],
				"exclude": ["node_modules", "dist"]
			};

			await fs.writeJson(tsConfigPath, tsConfig, { spaces: 2 });
		}
	}

	spinner.succeed('TypeScript configurations ready');
}

if (require.main === module) {
	setup().catch(console.error);
}

module.exports = setup;