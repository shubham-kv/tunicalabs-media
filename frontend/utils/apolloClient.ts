import {ApolloClient, InMemoryCache} from "@apollo/client"

const uri = (process.env.NODE_ENV === 'production')
	? 'https://tunicalabs-media-backend.herokuapp.com/graphql'
	: 'http://localhost:4000/graphql'

export const apolloClient = new ApolloClient({
	uri,
	cache: new InMemoryCache()
})
