const inquirer = require('inquirer');
const chalk = require('chalk');
const { spawn } = require('child_process');

const MENU_OPTIONS = [
	{ name: '🗄️  Sequelize (MySQL/PostgreSQL)', value: 'sequelize', port: 3001 },
	{ name: '🍃 Mongoose (MongoDB)', value: 'mongoose', port: 3002 },
	{ name: '📘 TypeORM (TypeScript)', value: 'typeorm', port: 3003 },
	{ name: '⚡ Prisma (Type-safe)', value: 'prisma', port: 3004 },
	{ name: '🔧 Knex.js (Query Builder)', value: 'knex', port: 3005 },
	{ name: '🎯 Objection.js (Knex + Models)', value: 'objection', port: 3006 },
	{ name: '🚀 MikroORM (TypeScript)', value: 'mikroorm', port: 3007 },
	{ name: '📦 Extract Template', value: 'extract' },
	{ name: '🛠️  Setup Project', value: 'setup' },
	{ name: '🧪 Test All ORMs', value: 'test-all' },
	{ name: '🌱 Seed All Databases', value: 'seed-all' },
	{ name: '❌ Exit', value: 'exit' }
];

async function showMenu() {
	console.clear();
	console.log(chalk.blue.bold('🚀 ORM Starter Templates'));
	console.log(chalk.gray('Choose an ORM to start or perform other actions\n'));

	const { action } = await inquirer.prompt([
		{
			type: 'list',
			name: 'action',
			message: 'What would you like to do?',
			choices: MENU_OPTIONS,
			pageSize: 12
		}
	]);

	switch (action) {
		case 'extract':
			await handleExtract();
			break;
		case 'setup':
			await runCommand('node', ['scripts/setup.js']);
			break;
		case 'test-all':
			await runCommand('node', ['scripts/test-all.js']);
			break;
		case 'seed-all':
			await runCommand('node', ['scripts/seed-all.js']);
			break;
		case 'exit':
			console.log(chalk.yellow('👋 Goodbye!'));
			process.exit(0);
			break;
		default:
			await startORM(action);
	}
}

async function handleExtract() {
	const { extractType } = await inquirer.prompt([
		{
			type: 'list',
			name: 'extractType',
			message: 'What would you like to extract?',
			choices: [
				{ name: 'Single Template', value: 'single' },
				{ name: 'All Templates', value: 'all' },
				{ name: '← Back to Main Menu', value: 'back' }
			]
		}
	]);

	switch (extractType) {
		case 'single':
			await runCommand('node', ['scripts/extract-template.js']);
			break;
		case 'all':
			await runCommand('node', ['scripts/extract-all.js']);
			break;
		case 'back':
			await showMenu();
			return;
	}

	await promptContinue();
}

async function startORM(ormName) {
	const selectedORM = MENU_OPTIONS.find(opt => opt.value === ormName);

	console.log(chalk.green(`\n🚀 Starting ${selectedORM.name}...`));
	console.log(chalk.blue(`📡 Server will be available at: http://localhost:${selectedORM.port}`));
	console.log(chalk.gray('Press Ctrl+C to stop the server\n'));

	await runCommand('npm', ['run', ormName]);
}

function runCommand(command, args) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			stdio: 'inherit',
			shell: true
		});

		child.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Command failed with code ${code}`));
			}
		});

		child.on('error', reject);
	});
}

async function promptContinue() {
	const { continue: shouldContinue } = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'continue',
			message: 'Return to main menu?',
			default: true
		}
	]);

	if (shouldContinue) {
		await showMenu();
	} else {
		console.log(chalk.yellow('👋 Goodbye!'));
		process.exit(0);
	}
}

// Handle process termination gracefully
process.on('SIGINT', () => {
	console.log(chalk.yellow('\n👋 Goodbye!'));
	process.exit(0);
});

if (require.main === module) {
	showMenu().catch(console.error);
}

module.exports = showMenu;