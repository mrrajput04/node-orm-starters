# Contributing to ORM Starter Templates

Thank you for your interest in contributing to this project! We welcome contributions that help make these ORM templates better for the entire developer community.

## 🤝 How to Contribute

### Adding a New ORM Template

1. **Fork the repository** and create a new branch
2. **Create a new folder** with the ORM name (e.g., `drizzle-orm/`, `waterline/`)
3. **Follow the template structure** (see Template Requirements below)
4. **Test your template** thoroughly
5. **Submit a pull request** with a clear description

### Improving Existing Templates

- Fix bugs or security vulnerabilities
- Improve error handling
- Add better documentation
- Optimize performance
- Update dependencies

### Documentation Improvements

- Fix typos or grammar
- Add clearer explanations
- Include more examples
- Improve setup instructions

## 📋 Template Requirements

Each ORM template must include:

### Required Files
```
orm-name/
├── README.md              # Setup and usage instructions
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .gitignore            # Appropriate gitignore rules
├── src/
│   ├── config/
│   │   └── database.js    # Database connection setup
│   ├── models/           # Model definitions
│   ├── controllers/      # Basic CRUD controllers
│   └── app.js           # Main application file
└── migrations/          # Database migrations (if applicable)
```

### Code Standards

- **Error Handling**: Proper try-catch blocks and error responses
- **Environment Variables**: All sensitive data in .env files
- **Code Style**: Consistent formatting and naming conventions
- **Comments**: Clear comments for complex logic
- **Validation**: Input validation and sanitization
- **Security**: Follow security best practices

### Documentation Standards

Each template's README.md must include:

1. **Prerequisites** (Node.js version, database requirements)
2. **Installation steps** with exact commands
3. **Environment setup** instructions
4. **Running the application** 
5. **API endpoints** with example requests/responses
6. **Database setup** (migrations, seeds)
7. **Common issues** and troubleshooting

## 🧪 Testing Requirements

Before submitting:

1. **Clean installation test**: Fresh `npm install` should work
2. **Database connection**: Verify connection with sample credentials
3. **CRUD operations**: All basic operations should work
4. **Error scenarios**: Test error handling (invalid data, connection issues)
5. **Documentation accuracy**: Follow your own setup instructions

## 💡 Contribution Ideas

### New ORMs to Add
- Drizzle ORM
- Waterline
- Bookshelf.js
- Node-ORM2
- Massive.js

### Features to Implement
- Authentication examples
- File upload handling
- Advanced querying patterns
- Caching integration
- Testing examples
- Docker configurations

### Improvements Needed
- Performance benchmarks
- TypeScript versions
- GraphQL integration examples
- Microservice patterns
- Cloud deployment guides

## 📝 Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features when possible
3. **Update the CHANGELOG.md** with your changes
4. **Use descriptive commit messages**
5. **Reference issues** in your PR description if applicable

### PR Title Format
```
[ORM-NAME] Brief description of changes
```

Examples:
- `[Prisma] Add authentication middleware example`
- `[TypeORM] Fix connection pool configuration`
- `[New] Add Drizzle ORM starter template`

## 🐛 Reporting Issues

When reporting bugs:

1. **Use a clear title** describing the problem
2. **Include steps to reproduce** the issue
3. **Share error messages** and logs
4. **Specify your environment** (Node.js version, OS, database)
5. **Check existing issues** to avoid duplicates

## 💬 Questions and Discussions

- Use **GitHub Discussions** for questions and general discussions
- Use **Issues** only for bugs and specific feature requests
- Be respectful and constructive in all interactions

## 🏷️ Code of Conduct

- Be welcoming and inclusive
- Respect different opinions and experiences
- Focus on constructive feedback
- Help others learn and grow

## 🎯 Getting Started

New to contributing? Start with:

1. **Good first issues** (labeled as `good-first-issue`)
2. **Documentation improvements**
3. **Testing existing templates**
4. **Reporting bugs you encounter**

## 📞 Need Help?

- Open a GitHub Discussion for questions
- Check existing issues and PRs
- Review the project's README.md

Thank you for making this project better for everyone! 🚀
