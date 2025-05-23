import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

	@Property({ unique: true })
	email!: string;

	@Property({ nullable: true })
	age?: number;

	@Property({ default: true })
	isActive: boolean = true;

	@Property({ onCreate: () => new Date() })
	createdAt: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt: Date = new Date();
}