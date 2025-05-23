const { extractTemplate, TEMPLATE_CONFIGS } = require('./extract-template');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function extractAll() {
	console.log(chalk.blue.bold('\n🚀 Extract All ORM Templates\n'));

	const { outputDir, confirmExtract } = await inquirer.prompt([
		{
			type: 'input',
			name: 'outputDir',
			message: 'Output directory for all templates:',
			default: './extracted-templates'
		},
		{
			type: 'confirm',
			name: 'confirmExtract',
			message: 'This will extract all 7 ORM templates. Continue?',
			default: true
		}
	]);

	if (!confirmExtract) {
		console.log(chalk.yellow('❌ Extraction cancelled'));
		return;
	}

	const spinner = ora('Extracting all templates...').start();

	try {
		const templates = Object.keys(TEMPLATE_CONFIGS);
		const results = [];

		for (const template of templates) {
			const templateOutputDir = path.join(outputDir, TEMPLATE_CONFIGS[template].name);

			try {
				await extractTemplate(template, { outputDir: templateOutputDir });
				results.push({ template, status: 'success', dir: templateOutputDir });
			} catch (error) {
				results.push({ template, status: 'error', error: error.message });
			}
		}

		spinner.succeed('All templates extraction completed!');

		// Show results
		console.log(chalk.green.bold('\n✅ Extraction Results:\n'));

		results.forEach(result => {
			if (result.status === 'success') {
				console.log(chalk.green(`✓ ${result.template} → ${result.dir}`));
			} else {
				console.log(chalk.red(`✗ ${result.template} → ${result.error}`));
			}
		});

		const successCount = results.filter(r => r.status === 'success').length;
		console.log(chalk.blue(`\n📊 Successfully extracted ${successCount}/${templates.length} templates`));

		if (successCount > 0) {
			console.log(chalk.yellow('\n📋 Next steps for each template:'));
			console.log(chalk.white('1. cd <template-directory>'));
			console.log(chalk.white('2. npm install'));
			console.log(chalk.white('3. cp .env.example .env'));
			console.log(chalk.white('4. Configure database in .env'));
			console.log(chalk.white('5. Run migrations/setup as needed'));
			console.log(chalk.white('6. npm run dev'));
		}

	} catch (error) {
		spinner.fail('Failed to extract templates');
		console.error(chalk.red(error.message));
	}
}

if (require.main === module) {
	extractAll().catch(console.error);
}

module.exports = extractAll;