import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client'
import AuthProvider from 'contexts/AuthContext'

import Layout from '@components/Layout'
import {apolloClient} from 'utils/apolloClient'

import '@styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<AuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</ApolloProvider>
	)
}

export default MyApp
