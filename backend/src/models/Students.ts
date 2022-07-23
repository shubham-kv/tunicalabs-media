import { Field, ObjectType } from "type-graphql"
import { Student } from "./Student"

@ObjectType()
export class Students {
	@Field(() => [Student])
	data: Student[]

	@Field()
	count: number
}
