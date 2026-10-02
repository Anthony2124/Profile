import http from 'node:http';
import path from 'node:path';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const photoExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon'
};
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'profile.js', 'photo.json']);

export async function findPhoto(root = siteRoot) {
  const candidates = [];
  for (const directory of ['', 'assets']) {
    try {
      const entries = await readdir(path.join(root, directory), { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile() || !photoExtensions.has(path.extname(entry.name).toLowerCase())) continue;
        const preferred = /^(profile|portrait|headshot|photo|anthony)([._ -]|$)/i.test(entry.name);
        candidates.push({ relative: directory ? directory + '/' + entry.name : entry.name, priority: preferred ? 0 : directory ? 2 : 1 });
      }
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  candidates.sort((a, b) => a.priority - b.priority || a.relative.localeCompare(b.relative));
  return candidates[0]?.relative || null;
}

export function createPortfolioServer(root = siteRoot) {
  const resolvedRoot = path.resolve(root);
  return http.createServer(async (request, response) => {
    const send = (status, content, type = 'text/plain; charset=utf-8') => {
      response.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : content);
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      return send(405, 'Method not allowed');
    }
    try {
      const requested = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replaceAll('\\', '/');
      const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
      if (relative === 'photo.json') {
        const photo = await findPhoto(resolvedRoot);
        return send(200, JSON.stringify({ photo: photo ? photo.split('/').map(encodeURIComponent).join('/') : null }), mimeTypes['.json']);
      }
      const target = path.resolve(resolvedRoot, relative);
      const withinRoot = path.relative(resolvedRoot, target);
      const extension = path.extname(relative).toLowerCase();
      const parts = relative.split('/');
      const allowed = publicFiles.has(relative) || (parts[0] === 'assets' && Boolean(mimeTypes[extension])) || (parts.length === 1 && photoExtensions.has(extension));
      if (!allowed || path.isAbsolute(withinRoot) || withinRoot.startsWith('..') || parts.some(part => part.startsWith('.'))) return send(404, 'Not found');
      const fileStat = await stat(target);
      if (!fileStat.isFile()) return send(404, 'Not found');
      const content = await readFile(target);
      return send(200, content, mimeTypes[extension] || 'application/octet-stream');
    } catch (error) {
      if (error instanceof URIError || error instanceof TypeError) return send(400, 'Bad request');
      if (['ENOENT', 'ENOTDIR', 'EACCES'].includes(error.code)) return send(404, 'Not found');
      console.error('Request failed:', error.message);
      return send(500, 'Server error');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const portIndex = process.argv.indexOf('--port');
  const hostIndex = process.argv.indexOf('--host');
  let port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 5173);
  const host = hostIndex >= 0 ? process.argv[hostIndex + 1] : '127.0.0.1';
  if (!Number.isInteger(port) || port < 1 || port > 65535 || !host) throw new Error('Provide a valid host and a port between 1 and 65535.');
  const server = createPortfolioServer();
  server.on('error', error => {
    if (error.code === 'EADDRINUSE' && portIndex < 0 && port < 5183) {
      port += 1;
      server.listen(port, host);
    } else { console.error(error.message); process.exitCode = 1; }
  });
  server.on('listening', () => console.log('\n  Anthony Cordial — Portfolio\n  http://' + host + ':' + port + '\n\n  Add a portrait to this folder or assets/, then refresh.\n'));
  server.listen(port, host);
}
