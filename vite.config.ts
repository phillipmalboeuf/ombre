import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

const https = false

const config: UserConfig = {
	server: {
		https,
	},
	plugins: [sveltekit(), ...https ? [basicSsl()] : []]
};

export default config;
