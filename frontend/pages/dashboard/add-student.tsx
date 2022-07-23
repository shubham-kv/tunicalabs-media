import {useCallback, useState} from 'react'
import type {ChangeEventHandler, FormEventHandler} from 'react'

import {gql, useMutation} from '@apollo/client'

import DashboardLayout from 'components/dashboard/DashboardLayout'
import {schools, standards, divisions} from 'utils/constants'

import styles from 'styles/dashboard/addStudent/index.module.scss'
import utilStyles from 'styles/utils.module.scss'


type FormData = {
	name: string
	dob: string
	school: string
	standard: string
	division: string
	status: string
}

const initialFormData: FormData = Object.freeze({
	name: '',
	dob: '',
	school: '',
	standard: '',
	division: '',
	status: ''
})

const CREATE_STUDENT = gql`
    mutation CreateStudent($data: CreateStudentInput!) {
        createStudent(data: $data) {
            id
        }
    }
`

const AddStudent = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const [createStudentMutation, {loading}] = useMutation(CREATE_STUDENT, {})

	const handleFormSubmit: FormEventHandler = useCallback((e) => {
		e.preventDefault()
		createStudentMutation({variables: {data: formData}})
		setFormData(initialFormData)
	}, [createStudentMutation, formData])

	const handleChange: ChangeEventHandler = useCallback((e) => {
		const inputElement = e.target as HTMLInputElement

		setFormData((prevData) => ({
			...prevData,
			[inputElement.name]: inputElement.value
		}))
	}, [])

	return (
		<DashboardLayout>
			<div className={styles.addStudent}>
				<h2>Add Student</h2>

				<form onSubmit={handleFormSubmit}>
					<div className={styles.inputWrapper}>
						<label htmlFor='fullNameInput'>Full name</label>
						<input id='fullNameInput'
							type='text'
							name='name'
							placeholder='Name'
							required
							onChange={handleChange}
							value={formData.name}
							disabled={loading} />
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='dobInput'>Date  of Birth</label>
						<input id='dobInput'
							type='date'
							name='dob'
							required
							onChange={handleChange}
							value={formData.dob} 
							disabled={loading} />
					</div>
					
					<div className={styles.inputWrapper}>
						<label htmlFor='schoolInput'>School</label>

						<select id='schoolInput' name='school' required
							onChange={handleChange}
							disabled={loading}
							value={formData.school}
							>
							<option value=''>School</option>
							{
								schools.map((school, i) => (
									<option key={i} value={school}>
										{school}
									</option>
								))
							}
						</select>
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='classInput'>Class</label>

						<select id='classInput' name='standard' required
							onChange={handleChange}
							disabled={loading}
							value={formData.standard}
							>
							<option value=''>Class</option>
							{
								Object.entries(standards).map(([key, value], i) => (
									<option key={i} value={value}>
										{key}
									</option>
								))
							}
						</select>
					</div>

					<div className={styles.inputWrapper}>
						<label htmlFor='divisionInput'>Division</label>
						
						<select id='divisionInput' name='division' required
							onChange={handleChange}
							disabled={loading}
							value={formData.division}>
							
							<option value=''>Division</option>
							{
								Object.entries(divisions).map(([key, value], i) => (
									<option key={i} value={value}>
										{key}
									</option>
								))
							}
						</select>
					</div>

					<div className={styles.inputWrapper}>
						<span>Status</span>

						<div className={styles.checkboxWrapper}>
							<input id='statusActiveRadio'
								type='radio'
								name='status'
								value='active'
								onChange={handleChange}
								checked={(formData.status as string) === 'active'}
								disabled={loading} />

							<label htmlFor='statusActiveRadio'>Active</label>
						</div>

						<div className={styles.checkboxWrapper}>
							<input id='statusInvoiceRadio'
								type='radio'
								name='status'
								value='invoice'
								onChange={handleChange}
								checked={(formData.status as string) === 'invoice'}
								disabled={loading} />

							<label htmlFor='statusInvoiceRadio'>Invoice</label>
						</div>
					</div>

					<button className={`${utilStyles.primaryBtn} ${styles.saveBtn}`}>
						Save
					</button>
				</form>
			</div>
		</DashboardLayout>
	)
}

export default AddStudent
