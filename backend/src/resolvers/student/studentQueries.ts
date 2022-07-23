import {Arg, Int, Query, Resolver} from 'type-graphql'
import {ILike} from 'typeorm'

import {Student} from '../../models/Student'
import {Students} from '../../models/Students'
import {AppDataSource} from '../../dataSource'
import {GetStudentsFilter} from './input_types/getStudentsFilter'


@Resolver()
export class StudentQueries {
	private readonly repo = AppDataSource.getRepository(Student)

	@Query(() => Students)
	async students(
		@Arg('filter', {nullable: true}) filter?: GetStudentsFilter,
		@Arg('skip', () => Int, {nullable: true}) skip?: number,
		@Arg('take', () => Int, {nullable: true}) take?: number,
	): Promise<Students> {

		if(!filter || Object.keys(filter).length == 0) {
			const [data, count] = await this.repo.findAndCount({skip, take})
			return {
				data,
				count
			}
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
				standard: ILike(filter.standard)
			}
		}

		if(filter.division) {
			where = {
				...where,
				division: ILike(filter.division)
			}
		}
		
		if(filter.status) {
			where = {
				...where,
				status: ILike(filter.status)
			}
		}

		const [data, count] = await this.repo.findAndCount({where, skip, take})
		return {
			data,
			count
		}
	}
}
