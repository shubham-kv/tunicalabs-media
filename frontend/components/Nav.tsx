import Image from 'next/image'
import {Badge} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import styles from 'styles/nav.module.scss'

const Nav = () => (
	<nav className={styles.nav}>
		<ul>
			<li>
				<Badge badgeContent={1} color='error'>
					<NotificationsIcon />
				</Badge>
			</li>
			<li>
				<button className={styles.userBtn}>
					<Image
						width={32} height={32}
						src='/shubham-kv.png' alt='shubham-kv' />
					<span>
						Shubham
					</span>
					<KeyboardArrowDownIcon />
				</button>
			</li>
		</ul>
	</nav>
)

export default Nav
