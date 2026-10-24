/** Origin of the QA Lab API Worker, set at build time. Empty: the Lab shows the recorded sample run only. */
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
