import Link from 'next/link'
import Nav from '@components/Nav'
import {useAuthContext} from 'contexts/AuthContext'
import styles from '@styles/header.module.scss'

const Header = () => {
	const {isAuthorized} = useAuthContext()
	return (
		<header className={styles.header}>
			<h1>
				<Link href='/'>
					<a>Tunicalabs Media</a>
				</Link>
			</h1>
			{
				isAuthorized && <Nav />
			}
		</header>
	)
}

export default Header
