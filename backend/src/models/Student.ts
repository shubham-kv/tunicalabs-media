import {Field, ID, ObjectType} from 'type-graphql'
import {
	Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn
} from 'typeorm'

@ObjectType()
@Entity({name: 'students'})
export class Student {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number
	
	@Field()
	@Column()
	name: string
	
	@Field()
	@Column({type: 'timestamptz'})
	dob: Date

	@Field()
	age(): number {
		return (new Date()).getFullYear() - this.dob.getFullYear()
	}
	
	@Field()
	@Column()
	school: string

	@Field()
	@Column()
	standard: string

	@Field()
	@Column()
	division: string
	
	@Field()
	@Column()
	status: string

	@Field()
	@CreateDateColumn()
	createdAt: Date

	@Field()
	@UpdateDateColumn()
	updatedAt: Date
}
