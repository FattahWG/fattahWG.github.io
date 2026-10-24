import { projects } from '@fattah/shared';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App, { SECTION_ROUTES } from './App';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

export interface PageMeta {
  url: string;
  /** Output files, relative to dist. GitHub Pages serves /lab from lab.html and /lab/ from lab/index.html. */
  files: string[];
  title: string;
  description: string;
}

const NAME = 'Fattah Widjaya Gandhi';
const HOME_DESCRIPTION =
  'Fattah Widjaya Gandhi: SQA Engineer with 2.5+ years in banking, insurance, and enterprise QA. Playwright and Bruno automation, a live QA Lab you can run yourself, and Roblox games at Lawak Studio.';

export const pages: PageMeta[] = [
  { url: '/', files: ['index.html'], title: `${NAME} · SQA Engineer`, description: HOME_DESCRIPTION },
  ...Object.entries(SECTION_ROUTES).map(([url, id]) => ({
    url,
    files: [`${url.slice(1)}.html`, `${url.slice(1)}/index.html`],
    title: `${id[0].toUpperCase()}${id.slice(1)} · ${NAME}`,
    description: HOME_DESCRIPTION,
  })),
  {
    url: '/lab',
    files: ['lab.html', 'lab/index.html'],
    title: `QA Lab · ${NAME}`,
    description: 'Run the Lawak Store Playwright suite on GitHub Actions and watch every step, log line, and video live.',
  },
  { url: '/lab/run', files: ['lab/run.html'], title: `QA Lab run · ${NAME}`, description: 'One run of the Lawak Store Playwright suite.' },
  ...projects.map((p) => ({
    url: `/projects/${p.slug}`,
    files: [`projects/${p.slug}.html`],
    title: `${p.name} · ${NAME}`,
    description: p.tagline.en,
  })),
  { url: '/404', files: ['404.html'], title: `Not found · ${NAME}`, description: 'This page does not exist.' },
];
