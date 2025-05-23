# 🚀 ORM Starter Templates Collection

A complete, feature-rich collection of ORM starter templates with extraction capabilities. Perfect for learning, comparing, and quickly bootstrapping projects with different ORMs.

## ✨ Features

- **7 Popular ORMs**: Sequelize, Mongoose, TypeORM, Prisma, Knex, Objection, MikroORM
- **Interactive Menu**: Easy-to-use CLI interface
- **Template Extraction**: Generate standalone projects
- **Comprehensive Setup**: Automated database setup and seeding
- **Testing Suite**: Verify all ORMs work correctly
- **Type Safety**: Full TypeScript support where applicable
- **Production Ready**: Includes security, logging, and best practices

## 🚀 Quick Start

1. **Clone and Setup**
   \`\`\`bash
   git clone https://github.com/mrrajput04/ORM_Starter_Template.git
   cd orm-starter-templates
   npm install
   npm run setup
   \`\`\`

2. **Start Interactive Menu**
   \`\`\`bash
   npm start
   \`\`\`

3. **Or Run Specific ORM**
   \`\`\`bash
   npm run sequelize  # Port 3001
   npm run mongoose   # Port 3002
   npm run typeorm    # Port 3003
   npm run prisma     # Port 3004
   npm run knex       # Port 3005
   npm run objection  # Port 3006
   npm run mikroorm   # Port 3007
   \`\`\`

## 📦 Template Extraction

### Extract Single Template
\`\`\`bash
npm run extract:sequelize
# Creates: sequelize-starter/
\`\`\`

### Extract All Templates
\`\`\`bash
npm run extract:all
# Creates: extracted-templates/
\`\`\`

### Interactive Extraction
\`\`\`bash
npm run extract
# Choose from menu
\`\`\`

## 🎯 Available ORMs

| ORM | Type | Language | Database | Port |
|-----|------|----------|----------|------|
| **Sequelize** | Active Record | JavaScript | SQL | 3001 |
| **Mongoose** | ODM | JavaScript | MongoDB | 3002 |
| **TypeORM** | Active Record | TypeScript | SQL | 3003 |
| **Prisma** | Query Builder | JavaScript/TS | SQL | 3004 |
| **Knex** | Query Builder | JavaScript | SQL | 3005 |
| **Objection** | Active Record | JavaScript | SQL | 3006 |
| **MikroORM** | Data Mapper | TypeScript | SQL | 3007 |

## 🛠️ Utility Scripts

- `npm run setup` - Interactive project setup
- `npm run test-all` - Test all ORMs
- `npm run seed-all` - Seed all databases
- `npm start` - Interactive menu

## 📁 Project Structure

Each ORM template includes:
- ✅ Express.js server setup
- ✅ Database configuration
- ✅ User model/entity
- ✅ CRUD API endpoints
- ✅ Migration files
- ✅ Seed data
- ✅ Error handling
- ✅ Security middleware
- ✅ Environment configuration
- ✅ Development scripts

## 🔧 Configuration

All templates use the same environment variables:

\`\`\`bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=orm_templates_db
MONGO_URI=mongodb://localhost:27017/orm_templates_db
\`\`\`

## 🏃‍♂️ Getting Started with Extracted Templates

After extracting a template:

\`\`\`bash
cd sequelize-starter/
npm install
cp .env.example .env
# Configure your database in .env
npm run migrate  # (if applicable)
npm run dev
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Check individual template READMEs
- Run `npm run test-all` to diagnose issues
- Ensure database credentials are correct
- Make sure required databases exist

---

**Happy coding! 🎉**