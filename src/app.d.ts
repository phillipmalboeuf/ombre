// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		token: string;
		customer?: {
			email: string
			name: string
			id: string
			collection: string
			payment_provider_id: string
			exp: number
		}
	}

	// interface PageData {}

	// interface Platform {}
}
