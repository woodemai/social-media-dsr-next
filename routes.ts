/**
 * An array of router that are accessible to the `public
 * These router do not require authentication
 * @type {string[]}
 */
export const publicRoutes:string[] = [];

/**
 * An array of router that are used for authentication
 * These router will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

/**
 * The prefix for API authentication router
 * Routes that start with tis prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
