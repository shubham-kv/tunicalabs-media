import {Field, InputType} from 'type-graphql'

@InputType()
export class CreateStudentInput {
	@Field()
	name: string

	@Field()
	dob: Date

	@Field()
	school: string

	@Field()
	standard: string

	@Field()
	division: string

	@Field()
	status: string
}