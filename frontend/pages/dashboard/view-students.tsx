import {Dispatch, MouseEvent, ReactElement, SetStateAction, useCallback, useEffect, useState} from 'react'
import {gql, QueryResult, useMutation, useQuery} from '@apollo/client'

import DashboardLayout from '@components/DashboardLayout'
import {divisions, schools, standards} from 'utils/constants'

import styles from '@styles/dashboard/view_students.module.scss'


interface Student {
	id: number
	name: string
	age: number
	school: string
	standard: string
	division: string
	status: string
}

type StudentWithTypeName = Student & {__typename: string}

type GetStudentsResultType = QueryResult<any, {
	filter: {}
	skip: number
	take: number
}>


const DELETE_STUDENT = gql`
    mutation DeleteStudent($id: Int!) {
        deleteStudent(id: $id)
    }
`

type ViewStudentsTableFn =
	(props: {getStudentsResult: GetStudentsResultType}) => ReactElement

const ViewStudentsTable: ViewStudentsTableFn = ({getStudentsResult}) => {
	const [deleteStudentMutation, deleteStudentResult] = useMutation(DELETE_STUDENT)

	const handleDelete = useCallback((e: MouseEvent, id: number) => {
		e.preventDefault()
		deleteStudentMutation({variables: {id}})
		getStudentsResult.refetch()
	}, [deleteStudentMutation, getStudentsResult])


	if(getStudentsResult.error) {
		console.error(getStudentsResult.error)
	}

	if(deleteStudentResult.error) {
		console.error(deleteStudentResult.error)
	}

	if(getStudentsResult.error || deleteStudentResult.error) {
		return <span style={{color: 'red'}}>Got Some Error!</span>
	}

	if(getStudentsResult.loading || deleteStudentResult.loading) {
		return <span>Loading...</span>
	}

	if(!getStudentsResult.data.students.length) {
		return <span>No data found!</span>
	}

	const students = (getStudentsResult.data.students as StudentWithTypeName[]).map(
		({__typename, ...rest}) => ({...rest})
	)

	const columns = Object.keys(students[0])

	return (
		<div className={styles.tableWrapper}>
			<table>
				<colgroup>
					<col span={1} width='8%' />
					<col span={1} width='20%' />
					<col span={1} width='8%' />
					<col span={1} width='25%' />
					<col span={1} width='10%' />
					<col span={1} width='10%' />
					<col span={1} width='8%' />
				</colgroup>
				<thead>
					<tr>
						{
						columns.map((column, i) => (
							<th key={i}>
								{column.replace(column.charAt(0), column.charAt(0).toUpperCase())}
							</th>
						))
						}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
					students.map((d, i) => (
						<tr key={i}>
							{
								columns.map((col, j) => (
									<td key={j}>
										{d[col as (keyof Student)]}
									</td>
								))
							}
							<td>
								<a className={styles.editLink}>
									Edit
								</a>
								<a className={styles.deleteLink}
									onClick={(e) => handleDelete(e, Number(d.id))}>
									Delete
								</a>
							</td>
						</tr>
					))
					}
				</tbody>
			</table>
		</div>
	)
}


const ViewStudentsFilter = () => (
	<div className={styles.filterWrapper}>
		<input className={styles.cinput}
			type='text' name='Name' placeholder='Name' />
		
		<input className={styles.cinput}
			type='number' name='Age' placeholder='Age' min={1} max={100} />

		<select className={styles.cselect} name='school'>
			<option value=''>School</option>
			{
				schools.map((school, i) => (
					<option key={i} value={school}>
						{school}
					</option>
				))
			}
		</select>

		<select className={styles.cselect} name='standard'>
			<option value=''>Class</option>
			{
				Object.entries(standards).map(([key, value], i) => (
					<option key={i} value={value}>
						{key}
					</option>
				))
			}
		</select>

		<select className={styles.cselect} name='division'>
			<option value=''>Division</option>
			{
				Object.entries(divisions).map(([key, value], i) => (
					<option key={i} value={value}>
						{key}
					</option>
				))
			}
		</select>

		<button className={styles.searchBtn}>
			Search
		</button>
	</div>
)


type ViewStudentsPaginationProps = {
	getStudentsResult: GetStudentsResultType
	perPage: number
	skip: number
	setSkip: Dispatch<SetStateAction<number>>
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
}

type ViewStudentsPaginationFn = (props: ViewStudentsPaginationProps) => ReactElement | null

const ViewStudentsPagination: ViewStudentsPaginationFn = (props) => {
	const {
		getStudentsResult, perPage,
		currentPage, setCurrentPage
	} = props

	const {data, loading, error} = getStudentsResult
	
	if(loading || error || (data.studentsCount === 0)) {
		return null
	}
	
	const totalCount = data.studentsCount
	const noOfPages = Math.floor(totalCount/perPage) + ((totalCount % perPage > 0) ? 1 : 0)

	return (
		<div className={styles.viewStudentsPagination}>
			<button className={styles.arrowPaginationBtn}
				onClick={() => {(currentPage > 0) && setCurrentPage(page => page - 1)}}
				disabled={currentPage === 0}>
				{'<'}
			</button>
			
			{
				Array(noOfPages).fill(0).map((_, i) => (
					<button key={i}
						className={(currentPage === i) ? styles.activePageBtn : ''}
						onClick={() => setCurrentPage(i)}>
						{i + 1}
					</button>
				))
			}
			
			<button className={styles.arrowPaginationBtn}
				onClick={() => {(currentPage - 1 < noOfPages) && setCurrentPage(page => page + 1)}}
				disabled={currentPage === noOfPages - 1}
				>
				{`>`}
			</button>
		</div>
	)
}



const GET_STUDENTS = gql`
    query GetStudentsQuery($filter: GetStudentsFilter, $skip: Int, $take: Int) {
		studentsCount
        students(filter: $filter, skip: $skip, take: $take) {
            id
            name
            age
            school
            standard
            division
			status
        }
    }
`

const ViewStudents = () => {
	const PER_PAGE = 8
	const [skip, setSkip] = useState(0)
	const [take] = useState(PER_PAGE)
	const [currentPage, setCurrentPage] = useState(0)

	const getStudentsResult = useQuery(GET_STUDENTS, {
		variables: {
			filter: {},
			skip,
			take
		},
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-and-network'
	})

	useEffect(() => {
		setSkip(currentPage * PER_PAGE)
	}, [currentPage])

	return (
		<DashboardLayout>
			<div className={styles.viewStudents}>
				<h2>View Students</h2>
				<ViewStudentsFilter />
				
				<ViewStudentsTable
					getStudentsResult={getStudentsResult}
					 />
				
				<ViewStudentsPagination
					getStudentsResult={getStudentsResult}
					skip={skip} perPage={take} setSkip={setSkip}
					currentPage={currentPage} setCurrentPage={setCurrentPage} />
			</div>
		</DashboardLayout>
	)
}

export default ViewStudents
