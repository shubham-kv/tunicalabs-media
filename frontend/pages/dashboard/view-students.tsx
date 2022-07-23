import DashboardLayout from 'components/dashboard/DashboardLayout'
import StudentsFilter from 'components/dashboard/viewStudents/StudentsFilter'
import StudentsPagination from 'components/dashboard/viewStudents/StudentsPagination'
import StudentsTable from 'components/dashboard/viewStudents/StudentsTable'

import {StudentCtxProvider} from 'contexts/StudentContext'

import styles from 'styles/dashboard/viewStudents/index.module.scss'


const ViewStudents = () => (
	<DashboardLayout>
		<StudentCtxProvider>
			<div className={styles.viewStudents}>
				<h2>View Students</h2>
				<StudentsFilter />
				<StudentsTable />
				<StudentsPagination />
			</div>
		</StudentCtxProvider>
	</DashboardLayout>
)

export default ViewStudents
