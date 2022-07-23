import {Field, InputType} from 'type-graphql'

@InputType()
export class GetStudentsFilter {
	@Field({nullable: true})
	name?: string

	@Field({nullable: true})
	school?: string

	@Field({nullable: true})
	standard?: string

	@Field({nullable: true})
	division?: string

	@Field({nullable: true})
	status?: string
}