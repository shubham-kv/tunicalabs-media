import {DataSource} from 'typeorm'
import {__prod__} from './constants'

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	database: 'tunicalabs_media',
	entities: [__dirname + '/models/*'],
	logging: !__prod__,
	synchronize: !__prod__,
	ssl: {
		rejectUnauthorized: false
	}
})
