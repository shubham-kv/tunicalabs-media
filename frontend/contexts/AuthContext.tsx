import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import type {ReactElement} from 'react'

type AuthCtxValue = {
	isAuthorized: boolean | null,
	setIsAuthorized: Dispatch<SetStateAction<boolean>> | null
}

const defaultCtxValue: AuthCtxValue = {
	isAuthorized: null,
	setIsAuthorized: null
}

const AuthContext = createContext(defaultCtxValue)

type AuthProviderProps = {
	children: ReactElement[] | ReactElement
}

// a dummy auth provider
const AuthProvider = ({children}: AuthProviderProps) => {
	const [isAuthorized, setIsAuthorized] = useState(false)
	const ctxValue = {isAuthorized, setIsAuthorized}

	return (
		<AuthContext.Provider value={ctxValue}>
			{children}
		</AuthContext.Provider>
	)
}

// a custom hook to use the Auth context
const useAuthContext = () => {
	const ctxValue = useContext(AuthContext)
	
	useEffect(() => {
		if(ctxValue.isAuthorized === null) {
			throw Error("The Component using 'useAuthContext' hook must be a descendant of 'AuthProvider'.")
		}
	}, [ctxValue.isAuthorized])

	return ctxValue
}

export default AuthProvider
export {useAuthContext}
