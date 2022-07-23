import {createContext, useContext, useEffect, useState} from 'react'
import type {PropsWithChildren, Dispatch, SetStateAction} from 'react'

type AuthCtxValue = {
	isAuthorized: boolean
	setIsAuthorized: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthCtxValue | null>(null)

const AuthProvider = ({children}: PropsWithChildren) => {
	const [isAuthorized, setIsAuthorized] = useState(false)
	const ctxValue = {isAuthorized, setIsAuthorized}

	return (
		<AuthContext.Provider value={ctxValue}>
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => {
	const ctxValue = useContext(AuthContext)
	
	useEffect(() => {
		if(ctxValue === null) {
			throw Error("The Component using 'useAuthContext' hook must be a descendant of 'AuthProvider'.")
		}
	}, [ctxValue])

	return ctxValue
}

export {AuthProvider, useAuthContext}
