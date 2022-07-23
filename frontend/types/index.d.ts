
declare global {
	interface Student {
		name: string
		age: number
		school: string
		standard: string
		division: string
		status: string
	}

	interface GraphqlStudent extends Student {
		id: number
		__typename: string
	}
}

export {}
