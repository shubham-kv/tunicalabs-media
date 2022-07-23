import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from 'styles/home.module.scss'

const links = Object.freeze({
	'Sign Up': '/sign-up',
	'Sign In': '/sign-in',
	'Dashboard': '/dashboard'
})

const Home: NextPage = () => (
	<>
	<Head>
		<title>Tunicalabs Media</title>
		<meta
			name='description'
			content='Tunicalabs media'
			/>
		<link rel='icon' href='/favicon.ico' />
	</Head>

	<div className={styles.home}>
		<div className={styles.linksContainer}>
			{
			Object.entries(links).map(([key, value], i) => (
				<div key={i} className={styles.linkWrapper}>
					<Link href={value}>
						<a>{key}</a>
					</Link>
				</div>
			))
			}
		</div>
	</div>
	</>
)

export default Home
