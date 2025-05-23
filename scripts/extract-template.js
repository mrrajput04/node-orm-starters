const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

const TEMPLATE_CONFIGS = {
	sequelize: {
		name: 'sequelize-starter',
		description: 'Sequelize ORM starter template with MySQL/PostgreSQL support',
		main: 'app.js',
		scripts: {
			start: 'node app.js',
			dev: 'nodemon app.js',
			migrate: 'npx sequelize-cli db:migrate',
			'migrate:undo': 'npx sequelize-cli db:migrate:undo',
			seed: 'npx sequelize-cli db:seed:all',
			'seed:undo': 'npx sequelize-cli db:seed:undo:all'
		},
		dependencies: {
			'express': '^4.18.2',
			'sequelize': '^6.32.1',
			'mysql2': '^3.6.0',
			'pg': '^8.11.3',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'nodemon': '^3.0.1',
			'sequelize-cli': '^6.6.1'
		}
	},

	mongoose: {
		name: 'mongoose-starter',
		description: 'Mongoose ODM starter template for MongoDB',
		main: 'app.js',
		scripts: {
			start: 'node app.js',
			dev: 'nodemon app.js',
			seed: 'node seeds/userSeeds.js'
		},
		dependencies: {
			'express': '^4.18.2',
			'mongoose': '^7.5.0',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'nodemon': '^3.0.1'
		}
	},

	typeorm: {
		name: 'typeorm-starter',
		description: 'TypeORM starter template with TypeScript support',
		main: 'dist/app.js',
		scripts: {
			start: 'node dist/app.js',
			dev: 'ts-node --watch src/app.ts',
			build: 'tsc',
			'migration:generate': 'npx typeorm migration:generate',
			'migration:run': 'npx typeorm migration:run',
			'migration:revert': 'npx typeorm migration:revert',
			seed: 'ts-node src/seeds/UserSeeder.ts'
		},
		dependencies: {
			'express': '^4.18.2',
			'typeorm': '^0.3.17',
			'mysql2': '^3.6.0',
			'pg': '^8.11.3',
			'reflect-metadata': '^0.1.13',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'typescript': '^5.1.6',
			'@types/node': '^20.5.0',
			'@types/express': '^4.17.17',
			'@types/cors': '^2.8.13',
			'@types/morgan': '^1.9.5',
			'ts-node': '^10.9.1'
		}
	},

	prisma: {
		name: 'prisma-starter',
		description: 'Prisma ORM starter template with type safety',
		main: 'app.js',
		scripts: {
			start: 'node app.js',
			dev: 'nodemon app.js',
			'db:generate': 'npx prisma generate',
			'db:push': 'npx prisma db push',
			'db:migrate': 'npx prisma migrate dev',
			'db:seed': 'node prisma/seed.js',
			'db:studio': 'npx prisma studio'
		},
		dependencies: {
			'express': '^4.18.2',
			'@prisma/client': '^5.2.0',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'nodemon': '^3.0.1',
			'prisma': '^5.2.0'
		}
	},

	knex: {
		name: 'knex-starter',
		description: 'Knex.js query builder starter template',
		main: 'app.js',
		scripts: {
			start: 'node app.js',
			dev: 'nodemon app.js',
			'migrate:make': 'npx knex migrate:make',
			'migrate:latest': 'npx knex migrate:latest',
			'migrate:rollback': 'npx knex migrate:rollback',
			'seed:make': 'npx knex seed:make',
			'seed:run': 'npx knex seed:run'
		},
		dependencies: {
			'express': '^4.18.2',
			'knex': '^2.5.1',
			'mysql2': '^3.6.0',
			'pg': '^8.11.3',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'nodemon': '^3.0.1'
		}
	},

	objection: {
		name: 'objection-starter',
		description: 'Objection.js ORM starter template built on Knex',
		main: 'app.js',
		scripts: {
			start: 'node app.js',
			dev: 'nodemon app.js',
			'migrate:make': 'npx knex migrate:make',
			'migrate:latest': 'npx knex migrate:latest',
			'migrate:rollback': 'npx knex migrate:rollback',
			'seed:make': 'npx knex seed:make',
			'seed:run': 'npx knex seed:run'
		},
		dependencies: {
			'express': '^4.18.2',
			'objection': '^3.1.1',
			'knex': '^2.5.1',
			'mysql2': '^3.6.0',
			'pg': '^8.11.3',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'nodemon': '^3.0.1'
		}
	},

	mikroorm: {
		name: 'mikroorm-starter',
		description: 'MikroORM starter template with TypeScript',
		main: 'dist/app.js',
		scripts: {
			start: 'node dist/app.js',
			dev: 'ts-node --watch src/app.ts',
			build: 'tsc',
			'migration:create': 'npx mikro-orm migration:create',
			'migration:up': 'npx mikro-orm migration:up',
			'migration:down': 'npx mikro-orm migration:down',
			seed: 'ts-node src/seeders/UserSeeder.ts'
		},
		dependencies: {
			'express': '^4.18.2',
			'@mikro-orm/core': '^5.8.0',
			'@mikro-orm/mysql': '^5.8.0',
			'@mikro-orm/postgresql': '^5.8.0',
			'@mikro-orm/reflection': '^5.8.0',
			'dotenv': '^16.3.1',
			'cors': '^2.8.5',
			'helmet': '^7.0.0',
			'morgan': '^1.10.0'
		},
		devDependencies: {
			'typescript': '^5.1.6',
			'@types/node': '^20.5.0',
			'@types/express': '^4.17.17',
			'@types/cors': '^2.8.13',
			'@types/morgan': '^1.9.5',
			'ts-node': '^10.9.1'
		}
	}
};

async function extractTemplate(templateName, options = {}) {
	if (!templateName) {
		const { selectedTemplate } = await inquirer.prompt([
			{
				type: 'list',
				name: 'selectedTemplate',
				message: 'Which template would you like to extract?',
				choices: Object.keys(TEMPLATE_CONFIGS).map(key => ({
					name: `${key} - ${TEMPLATE_CONFIGS[key].description}`,
					value: key
				}))
			}
		]);
		templateName = selectedTemplate;
	}

	const config = TEMPLATE_CONFIGS[templateName];
	if (!config) {
		console.error(chalk.red(`❌ Template "${templateName}" not found`));
		console.log(chalk.yellow('Available templates:'), Object.keys(TEMPLATE_CONFIGS).join(', '));
		return;
	}

	const sourcePath = path.join(__dirname, '..', templateName);
	const targetPath = options.outputDir || path.join(process.cwd(), config.name);

	if (!fs.existsSync(sourcePath)) {
		console.error(chalk.red(`❌ Source template directory not found: ${sourcePath}`));
		return;
	}

	const spinner = ora(`Extracting ${templateName} template...`).start();

	try {
		// Create target directory
		await fs.ensureDir(targetPath);

		// Copy template files
		await fs.copy(sourcePath, targetPath, {
			filter: (src) => {
				// Skip node_modules, dist, and other build artifacts
				const relativePath = path.relative(sourcePath, src);
				return !relativePath.includes('node_modules') &&
					!relativePath.includes('dist') &&
					!relativePath.startsWith('.');
			}
		});

		// Create package.json
		const packageJson = {
			name: config.name,
			version: '1.0.0',
			description: config.description,
			main: config.main,
			scripts: config.scripts,
			dependencies: config.dependencies,
			devDependencies: config.devDependencies,
			keywords: [templateName, 'orm', 'starter', 'template'],
			author: '',
			license: 'MIT'
		};

		await fs.writeJson(path.join(targetPath, 'package.json'), packageJson, { spaces: 2 });

		// Copy .env.example
		const envExamplePath = path.join(__dirname, '..', '.env.example');
		if (fs.existsSync(envExamplePath)) {
			await fs.copy(envExamplePath, path.join(targetPath, '.env.example'));
		}

		// Create README.md
		const readmeContent = generateReadme(templateName, config);
		await fs.writeFile(path.join(targetPath, 'README.md'), readmeContent);

		// Copy TypeScript config if needed
		if (['typeorm', 'mikroorm'].includes(templateName)) {
			const tsConfigPath = path.join(__dirname, '..', templateName, 'tsconfig.json');
			if (fs.existsSync(tsConfigPath)) {
				await fs.copy(tsConfigPath, path.join(targetPath, 'tsconfig.json'));
			}
		}

		spinner.succeed(`${templateName} template extracted successfully!`);

		console.log(chalk.green(`\n✅ Template extracted to: ${targetPath}`));
		console.log(chalk.yellow('\nNext steps:'));
		console.log(chalk.white(`1. cd ${path.basename(targetPath)}`));
		console.log(chalk.white('2. npm install'));
		console.log(chalk.white('3. cp .env.example .env (and configure your database)'));
		if (templateName === 'sequelize') {
			console.log(chalk.white('4. npm run migrate'));
		} else if (templateName === 'prisma') {
			console.log(chalk.white('4. npm run db:generate && npm run db:push'));
		} else if (['knex', 'objection'].includes(templateName)) {
			console.log(chalk.white('4. npm run migrate:latest'));
		}
		console.log(chalk.white(`${templateName === 'sequelize' ? '5' : '4'}. npm run dev`));

	} catch (error) {
		spinner.fail('Failed to extract template');
		console.error(chalk.red(error.message));
	}
}

function generateReadme(templateName, config) {
	return `# ${config.name}

${config.description}

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure environment:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials
   \`\`\`

3. ${templateName === 'sequelize' ? 'Run migrations:' :
			templateName === 'prisma' ? 'Generate Prisma client and push schema:' :
				['knex', 'objection'].includes(templateName) ? 'Run migrations:' : 'Start the server:'}
   \`\`\`bash
   ${templateName === 'sequelize' ? 'npm run migrate' :
			templateName === 'prisma' ? 'npm run db:generate && npm run db:push' :
				['knex', 'objection'].includes(templateName) ? 'npm run migrate:latest' : 'npm run dev'}
   \`\`\`

4. ${['sequelize', 'prisma', 'knex', 'objection'].includes(templateName) ? 'Start the server:' : 'Open your browser:'}
   \`\`\`bash
   ${['sequelize', 'prisma', 'knex', 'objection'].includes(templateName) ? 'npm run dev' : 'http://localhost:3000'}
   \`\`\`

## Available Scripts

${Object.entries(config.scripts).map(([script, command]) =>
					`- \`npm run ${script}\` - ${command}`
				).join('\n')}

## API Endpoints

- \`GET /users\` - Get all users
- \`POST /users\` - Create a new user
- \`GET /users/:id\` - Get user by ID
- \`PUT /users/:id\` - Update user by ID
- \`DELETE /users/:id\` - Delete user by ID

## Project Structure

\`\`\`
${config.name}/
├── ${config.main}              # Main application file
${templateName === 'sequelize' ? '├── config/               # Database configuration\n├── models/               # Sequelize models\n├── migrations/           # Database migrations\n├── seeders/              # Database seeders' :
			templateName === 'mongoose' ? '├── config/               # Database configuration\n├── models/               # Mongoose models\n├── seeds/                # Database seeders' :
				templateName === 'typeorm' ? '├── src/\n│   ├── config/          # Database configuration\n│   ├── entities/         # TypeORM entities\n│   ├── migrations/       # Database migrations\n│   └── seeds/            # Database seeders\n├── tsconfig.json         # TypeScript configuration' :
					templateName === 'prisma' ? '├── prisma/\n│   ├── schema.prisma    # Prisma schema\n│   └── seed.js          # Database seeder\n├── src/config/           # Database configuration' :
						['knex', 'objection'].includes(templateName) ? '├── config/               # Database configuration\n├── migrations/           # Database migrations\n├── seeds/                # Database seeders\n├── knexfile.js           # Knex configuration' + (templateName === 'objection' ? '\n├── models/               # Objection models' : '') :
							templateName === 'mikroorm' ? '├── src/\n│   ├── entities/         # MikroORM entities\n│   ├── seeders/          # Database seeders\n│   └── mikro-orm.config.ts # MikroORM configuration\n├── tsconfig.json         # TypeScript configuration' : ''}
├── .env.example          # Environment template
├── package.json          # Dependencies and scripts
└── README.md             # This file
\`\`\`

## Environment Variables

\`\`\`bash
${templateName === 'mongoose' ? 'MONGO_URI=mongodb://localhost:27017/your_db_name' :
			templateName === 'prisma' ? 'DATABASE_URL="mysql://username:password@localhost:3306/your_db_name"' :
				'DB_HOST=localhost\nDB_PORT=3306\nDB_USER=root\nDB_PASSWORD=your_password\nDB_NAME=your_db_name'}
PORT=3000
NODE_ENV=development
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
`;
}

async function main() {
	const templateName = process.argv[2];
	const outputDir = process.argv[3];

	await extractTemplate(templateName, { outputDir });
}

if (require.main === module) {
	main().catch(console.error);
}

module.exports = { extractTemplate, TEMPLATE_CONFIGS };