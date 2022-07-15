import {StudentQueries} from './studentQueries'
import {StudentMutations} from './studentMutations'

export const StudentResolvers = [
	StudentQueries,
	StudentMutations
] as const
