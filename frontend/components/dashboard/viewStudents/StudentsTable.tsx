import React, {useCallback} from 'react'
import {gql, useMutation} from '@apollo/client'

import {useStudentContext} from 'contexts/StudentContext'
import {columns} from 'utils/constants'

import styles from 'styles/dashboard/viewStudents/students_table.module.scss'


const DELETE_STUDENT = gql`
    mutation DeleteStudent($id: Int!) {
        deleteStudent(id: $id)
    }
`

const StudentsTable = () => {
	const {
		variables,
		data, loading, error,
	} = useStudentContext()!

	const [deleteStudentMutation, deleteStudentResult] = useMutation(DELETE_STUDENT, {
		refetchQueries: [
			'GetStudents'
		]
	})

	const handleDelete = useCallback((e: React.MouseEvent, id: number) => {
		e.preventDefault()
		deleteStudentMutation({variables: {id}})
	}, [deleteStudentMutation])

	if(error || deleteStudentResult.error) {
		return <span style={{color: 'red'}}>Got Some Error!</span>
	}

	if(data && data.students && (data.students.count === 0)) {
		return <span>No data found!</span>
	}

	return (
		<div className={styles.tableWrapper}>
			<table className={styles.studentsTable}>
				<colgroup>
					<col span={1} width='8%' />
					<col span={1} width='20%' />
					<col span={1} width='8%' />
					<col span={1} width='20%' />
					<col span={1} width='11%' />
					<col span={1} width='10%' />
					<col span={1} width='11%' />
					<col span={1} width='12%' />
				</colgroup>
				<thead>
					<tr>
						{columns.map((column, i) => (
							<th key={i}>
								{column.replace(column.charAt(0), column.charAt(0).toUpperCase())}
							</th>
						))}
						<th></th>
					</tr>
				</thead>

				<tbody>
					{
						(loading)
						? (
							Array(variables.take).fill(0).map((_, i) => (
								<tr key={i}>
									<td colSpan={columns.length + 1} className={styles.shimmer} />
								</tr>
							))
						)
						: (
							data && data.students.data.map((d, i) => (
								<tr key={i}>
									{columns.map((col, j) => (
										<td key={j}>
											{d[col as (keyof GraphqlStudent)]}
										</td>
									))}
									<td>
										<a className={styles.editLink}>Edit</a>
										<a className={styles.deleteLink}
											onClick={(e) => handleDelete(e, Number(d.id))}
											>
											Delete
										</a>
									</td>
								</tr>
							))
						)
					}
				</tbody>
			</table>
		</div>
	)
}

export default StudentsTable
