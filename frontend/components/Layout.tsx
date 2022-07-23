import type {PropsWithChildren} from 'react'
import Header from 'components/Header'

import styles from 'styles/layout.module.scss'

const Layout = ({children}: PropsWithChildren) => (
	<div className={styles.layout}>
		<Header />
		<main>
			{children}
		</main>
	</div>
)

export default Layout
