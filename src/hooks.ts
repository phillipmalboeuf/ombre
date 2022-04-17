// import cookie from 'cookie';
// import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)

	response.headers.set('Link', '<%svelte.assets%/ReallySansSmallStudent-Semibold.woff2>; rel="preload"; as="font"; type="font/woff2"; crossorigin="anonymous",<%svelte.assets%/MaisonNeueExtendedWEB-Bold.woff2>; rel="preload"; as="font"; type="font/woff2"; crossorigin="anonymous",<%svelte.assets%/MaisonNeueExtendedWEB-Demi.woff2>; rel="preload"; as="font"; type="font/woff2"; crossorigin="anonymous"')

	return response
}
