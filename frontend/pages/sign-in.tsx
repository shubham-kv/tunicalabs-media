import {useCallback, useRef, useState} from 'react'
import type {ChangeEventHandler} from 'react'
import Link from 'next/link'

import styles from 'styles/sign_forms.module.scss'
import utilStyles from 'styles/utils.module.scss'


type SignUpFormData = {
	email: string
	password: string
	termsAgreed: boolean
}

const SignIn = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		email: '',
		password: '',
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
				<h2 className={styles.formHeader}>Sign In</h2>

				<form onSubmit={e => e.preventDefault()}>
					<div className={styles.inputWrapper}>
						<input
							id='emailInput'
							name='email'
							type='email'
							placeholder='Your email'
							onChange={handleChange}
							required
							/>
						<label htmlFor='emailInput'>Email</label>
					</div>

					<div className={styles.inputWrapper}>
						<input
							id='passwordInput'
							name='password'
							type='password'
							placeholder='Your password'
							onChange={handleChange}
							required
							/>
						<label htmlFor='passwordInput'>Password</label>
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
						className={`${utilStyles.primaryBtn} ${styles.signInBtn}`}
						disabled={!formData.termsAgreed}>
							Sign In
					</button>
				</form>
				
				<div className={styles.extraPrompt}>
					{`Don't have an account? `}
					<Link href='/sign-up'>
						<a>Sign Up</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignIn
