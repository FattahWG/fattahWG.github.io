import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { runScheduled } from './cron';
import type { AppEnv, Env } from './env';
import { publicRoutes } from './routes/public';
import { runnerRoutes } from './routes/runner';

const app = new Hono<AppEnv>();

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'internal_error' }, 500);
});

app.get('/', (c) => c.text('fattahwg-qa-lab'));
app.route('/api/runner', runnerRoutes);

// The site is on GitHub Pages, a different origin. Only the listed origins can call the public API.
app.use('/api/*', (c, next) =>
  cors({
    origin: c.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()),
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })(c, next)
);
app.route('/api', publicRoutes);
app.notFound((c) => c.json({ error: 'not_found' }, 404));

export default {
  fetch: app.fetch,
  scheduled: (_event, env, ctx) => {
    ctx.waitUntil(runScheduled(env));
  },
} satisfies ExportedHandler<Env>;
