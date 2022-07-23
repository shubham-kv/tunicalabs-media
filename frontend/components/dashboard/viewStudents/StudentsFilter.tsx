import {useCallback, useState} from 'react'
import type {FormEvent} from 'react'
import {divisions, schools, standards} from 'utils/constants'
import {useStudentContext} from 'contexts/StudentContext'

import styles from 'styles/dashboard/viewStudents/filter.module.scss'

type FormData = {
	name: string
	school: string
	standard: string
	division: string
}

const initialFormData: FormData = Object.freeze({
	name: '',
	school: '',
	standard: '',
	division: ''
})

const StudentsFilter = () => {
	const {setVariables} = useStudentContext()!
	const [formData, setFormData] = useState<FormData>(initialFormData)

	const handleChange = useCallback((e: FormEvent) => {
		const inputElement = e.target as HTMLInputElement

		setFormData((prev) => ({
			...prev,
			[inputElement.name]: inputElement.value 
		}))
	}, [setFormData])

	const handleSubmit = useCallback(() => {
		setVariables((prev) => ({
			...prev,
			skip: 0,
			filter: formData
		}))
	}, [formData, setVariables])

	return (
		<div className={styles.filterWrapper}>
			<input className={styles.cinput}
				type='text' name='name' placeholder='Name'
				onChange={handleChange} />
			
			<input className={styles.cinput}
				type='number' name='age' placeholder='Age' min={1} max={100}
				/>

			<select className={styles.cselect} name='school'
				onChange={handleChange} >
				<option value=''>School</option>
				{
					schools.map((school, i) => (
						<option key={i} value={school}>
							{school}
						</option>
					))
				}
			</select>

			<select className={styles.cselect} name='standard'
				onChange={handleChange}>
				<option value=''>Class</option>
				{
					Object.entries(standards).map(([key, value], i) => (
						<option key={i} value={value}>
							{key}
						</option>
					))
				}
			</select>

			<select className={styles.cselect} name='division'
				onChange={handleChange}>
				<option value=''>Division</option>
				{
					Object.entries(divisions).map(([key, value], i) => (
						<option key={i} value={value}>
							{key}
						</option>
					))
				}
			</select>

			<button className={styles.searchBtn}
				onClick={handleSubmit}>
				Filter
			</button>
		</div>
	)
}

export default StudentsFilter
