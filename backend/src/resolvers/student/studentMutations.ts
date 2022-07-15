import {Arg, Int, Mutation, Resolver} from 'type-graphql'
import {CreateStudentInput} from './input_types/createStudentInput'

import {Student} from '../../models/Student'
import {AppDataSource} from '../../dataSource'

@Resolver(() => Student)
export class StudentMutations {
	private readonly repository = AppDataSource.getRepository(Student)

	@Mutation(() => Student, {nullable: true})
	async createStudent(
		@Arg('data') data: CreateStudentInput
	): Promise<Student|null> {
		try {
			const student = this.repository.create(data)
			await this.repository.save(student)
			return student
		}
		catch(e) {
			console.error(e)
			return null
		}
	}

	@Mutation(() => Boolean)
	async deleteStudent(
		@Arg('id', () => Int) id: number
	): Promise<Boolean> {
		try {
			const deleteResult = await this.repository.delete(id)
			return !!(deleteResult.affected)
		}
		catch(e) {
			console.error(e)
			return false
		}
	}
}
