import {Arg, Int, Query, Resolver} from 'type-graphql'
import {ILike} from 'typeorm'

import {Student} from '../../models/Student'
import {AppDataSource} from '../../dataSource'
import {GetStudentsFilter} from './input_types/getStudentsFilter'


@Resolver(() => Student)
export class StudentQueries {
	private readonly repo = AppDataSource.getRepository(Student)

	@Query(() => Int)
	async studentsCount() {
		return await this.repo.count()
	}

	@Query(() => [Student])
	async students(
		@Arg('filter', {nullable: true}) filter?: GetStudentsFilter,
		@Arg('skip', () => Int, {nullable: true}) skip?: number,
		@Arg('take', () => Int, {nullable: true}) take?: number,
	): Promise<Student[]> {

		if(!filter || Object.keys(filter).length == 0) {
			return await this.repo.find({skip, take})
		}

		let where = {}

		if(filter.name) {
			where = {
				name: ILike(`%${filter.name}%`)
			}
		}

		if(filter.school) {
			where = {
				...where,
				school: ILike(`%${filter.school}%`)
			}
		}

		if(filter.standard) {
			where = {
				...where,
				standard: filter.standard
			}
		}

		if(filter.division) {
			where = {
				...where,
				division: filter.division
			}
		}
		
		if(filter.status) {
			where = {
				...where,
				status: filter.status
			}
		}

		return await this.repo.find({where, skip, take})
	}
}
