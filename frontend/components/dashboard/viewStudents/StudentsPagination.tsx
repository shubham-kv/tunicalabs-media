import {useCallback, useEffect, useState} from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {useStudentContext} from 'contexts/StudentContext'

import styles from 'styles/dashboard/viewStudents/pagination.module.scss'


const StudentsPagination = () => {
	const {
		variables, setVariables,
		data, error,
	} = useStudentContext()!

	const [currentPage, setCurrentPage] = useState(Math.floor(variables.skip / variables.take))
	const totalCount = (data && data.students.count) ? data.students.count : 0
	const pageLimit = variables.take
	const noOfPages = Math.floor(totalCount/pageLimit) + ((totalCount % pageLimit > 0) ? 1 : 0)

	useEffect(() => {
		if(variables.skip === 0) {
			setCurrentPage(0)
		}	
	}, [variables])

	useEffect(() => {
		setVariables((prev) => ({
			...prev,
			skip: currentPage * prev.take
		}))
	}, [setVariables, currentPage])


	const handleLeftBtnClick = useCallback(() => {
		if(currentPage > 0) {
			setCurrentPage(page => page - 1)
		}
	}, [currentPage, setCurrentPage])


	const handleRightBtnClick = useCallback(() => {
		if(currentPage - 1 < noOfPages) {
			setCurrentPage(page => page + 1)
		}
	}, [noOfPages, currentPage, setCurrentPage])

	if(error || (totalCount === 0)) {
		return null
	}

	return (
		<div className={styles.studentsPagination}>
			<button className={styles.arrowPaginationBtn}
				onClick={handleLeftBtnClick}
				disabled={(currentPage === 0)}
				>
				<ArrowBackIosNewIcon fontSize='inherit' />
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
				onClick={handleRightBtnClick}
				disabled={(currentPage === noOfPages - 1)}
				>
				<ArrowForwardIosIcon fontSize='inherit' />
			</button>
		</div>
	)
}

export default StudentsPagination
