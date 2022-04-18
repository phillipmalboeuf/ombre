// import cookie from 'cookie';
// import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)

	response.headers.set('Link', '<./ReallySansSmallStudent-Semibold.woff2>; rel="prefetch"; as="font"; type="font/woff2"; crossorigin="anonymous",<./MaisonNeueExtendedWEB-Bold.woff2>; rel="prefetch"; as="font"; type="font/woff2"; crossorigin="anonymous",<./MaisonNeueExtendedWEB-Demi.woff2>; rel="prefetch"; as="font"; type="font/woff2"; crossorigin="anonymous"')

	return response
}
