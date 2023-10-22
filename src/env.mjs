import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/**
	 * Client Side Environment Variables (prefixed with `NEXT_PUBLIC_`)
	 */
	client: {
		NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
	},
	/**
	 * Runtime Environment Variables (prefixed with `NEXT_PUBLIC_`)
	 */
	experimental__runtimeEnv: {
		NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
	},
	/**
	 * Skip validation of environment variables, for building without verifying the environment variables.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
