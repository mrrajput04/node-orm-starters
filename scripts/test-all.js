const { spawn } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');

const ORMS = [
	{ name: 'sequelize', port: 3001 },
	{ name: 'mongoose', port: 3002 },
	{ name: 'typeorm', port: 3003 },
	{ name: 'prisma', port: 3004 },
	{ name: 'knex', port: 3005 },
	{ name: 'objection', port: 3006 },
	{ name: 'mikroorm', port: 3007 }
];

async function testORM(orm) {
	return new Promise((resolve) => {
		const spinner = ora(`Testing ${orm.name} on port ${orm.port}`).start();

		const child = spawn('npm', ['run', orm.name], {
			stdio: 'pipe',
			shell: true
		});

		let serverStarted = false;
		const timeout = setTimeout(() => {
			if (!serverStarted) {
				child.kill();
				spinner.fail(`${orm.name} - timeout`);
				resolve({ name: orm.name, status: 'timeout' });
			}
		}, 10000);

		child.stdout.on('data', (data) => {
			const output = data.toString();
			if (output.includes('Server running') || output.includes('listening')) {
				serverStarted = true;
				clearTimeout(timeout);

				// Test API endpoint
				testEndpoint(orm).then((apiResult) => {
					child.kill();
					if (apiResult.success) {
						spinner.succeed(`${orm.name} - API working`);
						resolve({ name: orm.name, status: 'success' });
					} else {
						spinner.fail(`${orm.name} - API failed: ${apiResult.error}`);
						resolve({ name: orm.name, status: 'api-error', error: apiResult.error });
					}
				});
			}
		});

		child.stderr.on('data', (data) => {
			const error = data.toString();
			if (error.includes('Error') || error.includes('EADDRINUSE')) {
				clearTimeout(timeout);
				child.kill();
				spinner.fail(`${orm.name} - ${error.split('\n')[0]}`);
				resolve({ name: orm.name, status: 'error', error: error.split('\n')[0] });
			}
		});

		child.on('close', (code) => {
			clearTimeout(timeout);
			if (!serverStarted && code !== 0) {
				spinner.fail(`${orm.name} - exit code ${code}`);
				resolve({ name: orm.name, status: 'error', code });
			}
		});
	});
}

async function testEndpoint(orm) {
	try {
		const response = await fetch(`http://localhost:${orm.port}/users`);
		if (response.ok) {
			return { success: true };
		} else {
			return { success: false, error: `HTTP ${response.status}` };
		}
	} catch (error) {
		return { success: false, error: error.message };
	}
}

async function testAll() {
	console.log(chalk.blue.bold('\n🧪 Testing All ORM Templates\n'));

	const results = [];

	for (const orm of ORMS) {
		const result = await testORM(orm);
		results.push(result);
	}

	// Summary
	console.log(chalk.blue.bold('\n📊 Test Results Summary:\n'));

	const successful = results.filter(r => r.status === 'success');
	const failed = results.filter(r => r.status !== 'success');

	if (successful.length > 0) {
		console.log(chalk.green.bold('✅ Working ORMs:'));
		successful.forEach(r => console.log(chalk.green(`  ✓ ${r.name}`)));
	}

	if (failed.length > 0) {
		console.log(chalk.red.bold('\n❌ Failed ORMs:'));
		failed.forEach(r => {
			console.log(chalk.red(`  ✗ ${r.name} - ${r.status}`));
			if (r.error) {
				console.log(chalk.gray(`    ${r.error}`));
			}
		});
	}

	console.log(chalk.blue(`\n📈 Success Rate: ${successful.length}/${ORMS.length} (${Math.round(successful.length / ORMS.length * 100)}%)`));

	if (failed.length > 0) {
		console.log(chalk.yellow('\n💡 Tips for failed ORMs:'));
		console.log(chalk.white('  • Check database connection settings in .env'));
		console.log(chalk.white('  • Run migrations: npm run <orm>:migrate'));
		console.log(chalk.white('  • Check if ports are available'));
		console.log(chalk.white('  • Install dependencies: npm install'));
	}
}

if (require.main === module) {
	testAll().catch(console.error);
}

module.exports = testAll;