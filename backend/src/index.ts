import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'

import {__prod__} from './constants'
import {StudentResolvers} from './resolvers/student'
import {AppDataSource} from './dataSource'


const main = async () => {
	dotenv.config()

	const app = express()
	const PORT = process.env.PORT || 4000
	const corsOptions = {
		credentials: true,
		origin: [process.env.FRONTEND_CLIENT as string]
	}

	if(!__prod__) {
		corsOptions.origin.push('https://studio.apollographql.com')
	}

	app.use(cors(corsOptions))

	const schema = await buildSchema({
		resolvers: [...StudentResolvers]
	})

	const apolloServer = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: 'bounded'
	})

	await apolloServer.start()
	apolloServer.applyMiddleware({app, cors: corsOptions})	

	await AppDataSource.initialize()

	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}${apolloServer.graphqlPath}/`)
	})
}

try {
	main()
}
catch(e) {
	console.error(e)
}
