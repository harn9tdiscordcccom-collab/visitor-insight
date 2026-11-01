import { authorized } from '../_auth.js';

export async function onRequestGet({ request, env }) {
  try {
    if (!await authorized(request, env)) {
      return Response.json({ error: 'Please sign in' }, { status: 401 });
    }

    if (!env.DB) {
      return Response.json({ error: 'DB binding is missing' }, { status: 500 });
    }

    const result = await env.DB
      .prepare('SELECT * FROM visits ORDER BY id DESC LIMIT 500')
      .all();

    return Response.json({ visitors: result.results || [] });

  } catch (error) {
    return Response.json({
      error: 'Dashboard error',
      detail: String(error.message || error)
    }, { status: 500 });
  }
}

export async function onRequestDelete({ request, env }) {
  try {
    if (!await authorized(request, env)) {
      return Response.json({ error: 'Please sign in' }, { status: 401 });
    }

    await env.DB.prepare('DELETE FROM visits').run();
    return Response.json({ ok: true });

  } catch (error) {
    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }
}
