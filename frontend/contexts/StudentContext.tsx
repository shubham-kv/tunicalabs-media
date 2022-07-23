import React, {createContext, useContext, useEffect, useState} from 'react'
import type {PropsWithChildren, Dispatch, SetStateAction} from 'react'

import {gql, useLazyQuery} from '@apollo/client'
import type {ApolloError, LazyQueryExecFunction} from '@apollo/client'

type StudentsQueryFilter = {
	name?: string
	school?: string
	standard?: string
	division?: string
}

type StudentsQueryVariables = {
	skip: number
	take: number
	filter: StudentsQueryFilter
}

type StudentCtxValueType = {
	variables: StudentsQueryVariables
	setVariables: Dispatch<SetStateAction<StudentsQueryVariables>>
	
	getStudents: LazyQueryExecFunction<any, StudentsQueryVariables>
	data: {
		students: {
			count: number
			data: GraphqlStudent[]
		}
	}
	loading: boolean
	error: ApolloError | undefined
}

const StudentContext = createContext<StudentCtxValueType | null>(null)

const GET_STUDENTS = gql`
	query GetStudents($filter: GetStudentsFilter!, $skip: Int, $take: Int) {
		students(filter: $filter, skip: $skip, take: $take) {
			count
			data {
				id
				name
				age
				school
				standard
				division
				status
			}
		}
	}
`

const StudentCtxProvider = ({children}: PropsWithChildren) => {
	const pageLimit = 8

	const [variables, setVariables] = useState<StudentsQueryVariables>({
		skip: 0,
		take: pageLimit,
		filter: {}
	})

	const [getStudents, {data, loading, error}] = useLazyQuery<any, StudentsQueryVariables>(GET_STUDENTS, {
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-and-network'
	})

	useEffect(() => {
		getStudents({variables})
	}, [getStudents, variables])

	const ctxValue: StudentCtxValueType = {
		variables, setVariables,
		getStudents, data, loading, error
	}

	return (
		<StudentContext.Provider value={ctxValue}>
			{children}
		</StudentContext.Provider>
	)
}

const useStudentContext = () => {
	const ctxValue = useContext(StudentContext)
	
	useEffect(() => {
		if(ctxValue === null) {
			throw Error("The Component using 'useStudentContext' hook must be a descendant of 'StudentCtxProvider'.")
		}
	}, [ctxValue])
	
	return ctxValue
}

export {StudentCtxProvider, useStudentContext}
