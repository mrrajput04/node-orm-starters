const { spawn } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

const SEED_COMMANDS = [
	{ name: 'Sequelize', command: 'npm', args: ['run', 'sequelize:seed'] },
	{ name: 'Mongoose', command: 'npm', args: ['run', 'mongoose:seed'] },
	{ name: 'TypeORM', command: 'npm', args: ['run', 'typeorm:seed'] },
	{ name: 'Prisma', command: 'npm', args: ['run', 'prisma:seed'] },
	{ name: 'Knex', command: 'npm', args: ['run', 'knex:seed'] },
	{ name: 'Objection', command: 'npm', args: ['run', 'objection:seed'] },
	{ name: 'MikroORM', command: 'npm', args: ['run', 'mikroorm:seed'] }
];

async function runSeedCommand(seedConfig) {
	return new Promise((resolve) => {
		const spinner = ora(`Seeding ${seedConfig.name}`).start();

		const child = spawn(seedConfig.command, seedConfig.args, {
			stdio: 'pipe',
			shell: true
		});

		let output = '';
		let error = '';

		child.stdout.on('data', (data) => {
			output += data.toString();
		});

		child.stderr.on('data', (data) => {
			error += data.toString();
		});

		child.on('close', (code) => {
			if (code === 0) {
				spinner.succeed(`${seedConfig.name} seeded successfully`);
				resolve({ name: seedConfig.name, status: 'success' });
			} else {
				spinner.fail(`${seedConfig.name} seeding failed`);
				resolve({
					name: seedConfig.name,
					status: 'error',
					error: error || `Exit code: ${code}`
				});
			}
		});
	});
}

async function seedAll() {
	console.log(chalk.blue.bold('\n🌱 Seeding All Databases\n'));
	console.log(chalk.yellow('Make sure your databases are set up and migrations are run!\n'));

	const results = [];

	for (const seedConfig of SEED_COMMANDS) {
		const result = await runSeedCommand(seedConfig);
		results.push(result);
	}

	// Summary
	console.log(chalk.blue.bold('\n📊 Seeding Results:\n'));

	const successful = results.filter(r => r.status === 'success');
	const failed = results.filter(r => r.status !== 'success');

	if (successful.length > 0) {
		console.log(chalk.green.bold('✅ Successfully seeded:'));
		successful.forEach(r => console.log(chalk.green(`  ✓ ${r.name}`)));
	}

	if (failed.length > 0) {
		console.log(chalk.red.bold('\n❌ Failed to seed:'));
		failed.forEach(r => {
			console.log(chalk.red(`  ✗ ${r.name}`));
			if (r.error) {
				console.log(chalk.gray(`    ${r.error.split('\n')[0]}`));
			}
		});

		console.log(chalk.yellow('\n💡 Common issues:'));
		console.log(chalk.white('  • Database not created or accessible'));
		console.log(chalk.white('  • Migrations not run'));
		console.log(chalk.white('  • Incorrect database credentials in .env'));
	}

	console.log(chalk.blue(`\n📈 Success Rate: ${successful.length}/${SEED_COMMANDS.length}`));
}

if (require.main === module) {
	seedAll().catch(console.error);
}

module.exports = seedAll;