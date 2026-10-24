import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/** Put the QA Lab API origin into the CSP of index.html. The dev server also drops the HTTPS upgrade. */
function cspApiOrigin(apiUrl: string | undefined, dev: boolean): Plugin {
  const origin = apiUrl ? new URL(apiUrl).origin : '';
  return {
    name: 'csp-api-origin',
    transformIndexHtml(html) {
      const out = html.replaceAll(' __API_ORIGIN__', origin ? ` ${origin}` : '');
      return dev ? out.replace('; upgrade-insecure-requests', '') : out;
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, __dirname, 'VITE_');
  return {
    // The QA Lab API is a separate Cloudflare Worker. Locally, run it with `npm run dev -w apps/backend`
    // (port 8788) and put VITE_API_URL=http://127.0.0.1:8788 in apps/frontend/.env.local.
    plugins: [react(), cspApiOrigin(env.VITE_API_URL || process.env.VITE_API_URL, command === 'serve')],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    // No data: URLs: the CSP allows fonts and images from the site itself only.
    build: { assetsInlineLimit: 0 },
  };
});
