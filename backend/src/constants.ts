
export const __prod__ = (process.env.NODE_ENV === 'production')
export const CLIENT = 
	(__prod__)
		? process.env.FRONTEND_CLIENT as string
		: 'http://localhost:3000'
