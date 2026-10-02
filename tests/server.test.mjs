import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createPortfolioServer, findPhoto } from '../server.mjs';

async function fixture(run) {
  const temporaryRoot = path.resolve(tmpdir());
  const directory = await mkdtemp(path.join(temporaryRoot, 'anthony-portfolio-test-'));
  const server = createPortfolioServer(directory);
  try {
    await mkdir(path.join(directory, 'assets'));
    await writeFile(path.join(directory, 'index.html'), '<!doctype html><title>Portfolio</title>');
    await writeFile(path.join(directory, 'app.js'), 'export const ready = true;');
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    await run({ directory, url: 'http://127.0.0.1:' + server.address().port });
  } finally {
    await new Promise(resolve => server.close(resolve));
    const relative = path.relative(temporaryRoot, directory);
    assert.ok(!path.isAbsolute(relative) && !relative.startsWith('..') && relative.startsWith('anthony-portfolio-test-'));
    await rm(directory, { recursive: true, force: true });
  }
}

test('serves the website and JavaScript with correct content types', async () => fixture(async ({ url }) => {
  const page = await fetch(url);
  assert.equal(page.status, 200);
  assert.match(page.headers.get('content-type'), /text\/html/);
  assert.match(await page.text(), /Portfolio/);
  const script = await fetch(url + '/app.js');
  assert.match(script.headers.get('content-type'), /text\/javascript/);
  const head = await fetch(url, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
}));

test('does not expose hidden files, configuration, or paths outside the site', async () => fixture(async ({ directory, url }) => {
  await mkdir(path.join(directory, '.git'));
  await writeFile(path.join(directory, '.git', 'config'), 'private');
  await writeFile(path.join(directory, '.env'), 'private');
  await writeFile(path.join(directory, 'server.mjs'), 'private');
  for (const suffix of ['/.git/config', '/.env', '/server.mjs', '/assets/../.git/config', '/assets/%2e%2e%5c.git/config']) {
    assert.equal((await fetch(url + suffix)).status, 404, suffix);
  }
  assert.equal((await fetch(url + '/%zz')).status, 400);
  assert.equal((await fetch(url, { method: 'POST' })).status, 405);
}));

test('detects a newly added root photo and encodes filenames correctly', async () => fixture(async ({ directory, url }) => {
  assert.deepEqual(await (await fetch(url + '/photo.json')).json(), { photo: null });
  await writeFile(path.join(directory, 'my portrait.jpg'), 'photo');
  const response = await (await fetch(url + '/photo.json')).json();
  assert.deepEqual(response, { photo: 'my%20portrait.jpg' });
  const image = await fetch(url + '/' + response.photo);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/jpeg');
}));

test('preferred portrait filenames beat arbitrary images; assets are a fallback', async () => fixture(async ({ directory }) => {
  await writeFile(path.join(directory, 'assets', 'sample.png'), 'photo');
  assert.equal(await findPhoto(directory), 'assets/sample.png');
  await writeFile(path.join(directory, 'random.JPG'), 'photo');
  assert.equal(await findPhoto(directory), 'random.JPG');
  await writeFile(path.join(directory, 'assets', 'profile.webp'), 'photo');
  assert.equal(await findPhoto(directory), 'assets/profile.webp');
}));
