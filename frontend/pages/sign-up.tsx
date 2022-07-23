import {useCallback, useRef, useState} from 'react'
import type {ChangeEventHandler} from 'react'
import Link from 'next/link'

import styles from 'styles/sign_forms.module.scss'
import utilStyles from 'styles/utils.module.scss'


type SignUpFormData = {
	email: string
	password: string
	confirmedPassword: string
	termsAgreed: boolean
}

const SignUp = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		email: '',
		password: '',
		confirmedPassword: '',
		termsAgreed: false
	})

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
		setFormData(prevData => ({
			...prevData,
			[e.target.name]: (e.target.type !== 'checkbox')
				? e.target.value
				: e.target.checked
		}))
	}, [])

	const submitBtnRef = useRef<HTMLButtonElement>(null!)

	return (
		<div className={styles.formBg}>
			<div className={styles.signForm}>
				<h2 className={styles.formHeader}>Sign Up</h2>

				<form onSubmit={(e) => e.preventDefault()}>
					<div className={styles.inputWrapper}>
						<input
							id='emailInput'
							name='email'
							type='email'
							placeholder='Your email'
							required
							onChange={handleChange}
							/>
							<label htmlFor='emailInput'>Email</label>
					</div>

					<div className={styles.inputWrapper}>
						<input
							id='passwordInput'
							name='password'
							type='password'
							placeholder='Your password'
							required
							onChange={handleChange}
							/>
						<label htmlFor='passwordInput'>Password</label>
					</div>

					<div className={styles.inputWrapper}>
						<input
							id='confirmPasswordInput'
							name='confirmedPassword'
							type='password'
							placeholder='Confirm password'
							required
							onChange={handleChange}
							/>
						<label htmlFor='confirmPasswordInput'>Confirm password</label>
					</div>

					<div className={styles.agreeTermsInputWrapper}>
						<input
							id='agreeTermsCheckBox'
							name='termsAgreed'
							type='checkbox'
							required
							onChange={handleChange}
							/>

						<label htmlFor='agreeTermsCheckBox'>
							I agree to the terms &amp; conditions
						</label>
					</div>

					<button
						ref={submitBtnRef}
						className={`${utilStyles.primaryBtn} ${styles.signUpBtn}`}
						disabled={!formData.termsAgreed}>
						Sign Up
					</button>
				</form>

				<div className={styles.extraPrompt}>
					{`Already have an account? `}
					<Link href='/sign-in'>
						<a>Sign In</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
