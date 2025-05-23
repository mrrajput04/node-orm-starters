# Prisma Starter Template

A production-ready Prisma starter template with TypeScript support, migrations, and best practices for modern Node.js applications.

## 🚀 Features

- **Type-safe database client** with auto-generated types
- **Schema-first development** with Prisma Schema Language
- **Database migrations** with version control
- **Seeding scripts** for development data
- **Environment configuration** with validation
- **Error handling** and logging
- **CRUD operations** with proper validation
- **Relationship management** (one-to-many, many-to-many)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+ (or MySQL 8+, SQLite)
- Git

## 🛠️ Installation

1. **Copy this template to your project:**
```bash
cp -r prisma-template/ my-new-project/
cd my-new-project/
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Configure your database URL in `.env`:**
```env
# PostgreSQL example
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# MySQL example  
# DATABASE_URL="mysql://username:password@localhost:3306/mydb"

# SQLite example
# DATABASE_URL="file:./dev.db"

PORT=3000
NODE_ENV=development
```

5. **Generate Prisma client:**
```bash
npx prisma generate
```

6. **Run initial migration:**
```bash
npx prisma db push
```

7. **Seed the database (optional):**
```bash
npm run seed
```

8. **Start the development server:**
```bash
npm run dev
```

## 📁 Project Structure

```
prisma-template/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.js               # Database seeding
├── src/
│   ├── controllers/
│   │   └── userController.js  # User CRUD operations
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handling
│   ├── routes/
│   │   └── users.js          # User routes
│   ├── services/
│   │   └── userService.js    # Business logic
│   ├── utils/
│   │   └── validation.js     # Input validation
│   ├── lib/
│   │   └── prisma.js         # Prisma client instance
│   └── app.js               # Express app setup
├── package.json
├── .env.example
└── README.md
```

## 🗄️ Database Schema

The template includes a User model with common fields:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start with nodemon
npm start               # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Create and run migration
npm run db:studio       # Open Prisma Studio
npm run db:reset        # Reset database
npm run seed           # Seed database with sample data

# Utilities
npm run lint           # ESLint check
npm run format         # Prettier formatting
```

## 🌐 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/users/:id/posts` - Get user's posts
- `POST /api/users/:id/posts` - Create post for user

### Example Requests

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

## 🔍 Prisma Commands

```bash
# Schema management
npx prisma init                    # Initialize Prisma
npx prisma generate               # Generate client
npx prisma db push               # Push schema changes
npx prisma db pull               # Pull from existing DB

# Migrations
npx prisma migrate dev           # Create and apply migration
npx prisma migrate deploy        # Deploy migrations (production)
npx prisma migrate reset         # Reset database

# Data management
npx prisma db seed              # Run seed script
npx prisma studio               # Open database browser

# Introspection
npx prisma db pull              # Generate schema from existing DB
npx prisma validate             # Validate schema file
```

## 🐳 Docker Support

**docker-compose.yml** for local PostgreSQL:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start with: `docker-compose up -d`

## 🧪 Testing

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

## 📈 Performance Tips

1. **Use select to limit fields:**
```javascript
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
});
```

2. **Include related data efficiently:**
```javascript
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }
});
```

3. **Use transactions for multiple operations:**
```javascript
await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.post.create({ data: postData })
]);
```

## 🛡️ Security Considerations

- Input validation with Zod or Joi
- SQL injection protection (built-in with Prisma)
- Environment variable validation
- Rate limiting implementation
- Authentication middleware

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NODE_ENV=production
PORT=3000
```

### Deploy Migrations
```bash
npx prisma migrate deploy
npx prisma generate
```

## 🐛 Common Issues

**Error: Environment variable not found**
- Ensure `.env` file exists and `DATABASE_URL` is set

**Migration failed**
- Check database connection and permissions
- Verify schema syntax with `npx prisma validate`

**Type errors after schema changes**
- Regenerate client: `npx prisma generate`

**Connection pool exhausted**
- Configure connection limits in schema.prisma

## 📚 Learn More

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
- [Database Connectors](https://www.prisma.io/docs/concepts/database-connectors)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

## 🤝 Contributing

See the main [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on improving this template.

## 📄 License

This template is part of the ORM Starter Templates project and is MIT licensed.
