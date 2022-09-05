import { TOKEN_KEY } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	event.locals.token = cookies[TOKEN_KEY];

	if (event.locals.token) {
		event.locals.customer = JSON.parse(Buffer.from(event.locals.token.split('.')[1], 'base64').toString())
	}

	const response = await resolve(event);

	// if (!cookies['userid']) {
	// 	// if this is the first time the user has visited this app,
	// 	// set a cookie so that we recognise them when they return
	// 	response.headers.set(
	// 		'set-cookie',
	// 		cookie.serialize('userid', event.locals.userid, {
	// 			path: '/',
	// 			httpOnly: true
	// 		})
	// 	);
	// }

	return response;
};
