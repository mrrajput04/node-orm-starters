const BaseModel = require('./BaseModel');

class User extends BaseModel {
	static get tableName() {
		return 'users';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['name', 'email'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string', minLength: 1, maxLength: 255 },
				email: { type: 'string', format: 'email' },
				age: { type: 'integer', minimum: 0 },
				is_active: { type: 'boolean' }
			}
		};
	}
}

module.exports = User;