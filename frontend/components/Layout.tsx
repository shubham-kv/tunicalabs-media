import React, {ReactElement} from 'react'
import Header from '@components/Header'

import styles from '@styles/layout.module.scss'

type LayoutFn =
	(props: {children: ReactElement[] | ReactElement}) => ReactElement

const Layout: LayoutFn = ({children}) => {
	return (
		<div className={styles.layout}>
			<Header />
			<main>
				{children}
			</main>
		</div>
	)
}

export default Layout
