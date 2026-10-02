import path from 'node:path';
import { cp, mkdir, writeFile } from 'node:fs/promises';
import { findPhoto, siteRoot } from './server.mjs';

const output = path.join(siteRoot, 'dist');
await mkdir(output, { recursive: true });
for (const filename of ['index.html', 'styles.css', 'app.js', 'profile.js']) {
  await cp(path.join(siteRoot, filename), path.join(output, filename));
}
await cp(path.join(siteRoot, 'assets'), path.join(output, 'assets'), { recursive: true });
const photo = await findPhoto();
if (photo && !photo.startsWith('assets/')) await cp(path.join(siteRoot, photo), path.join(output, photo));
await writeFile(path.join(output, 'photo.json'), JSON.stringify({ photo: photo ? photo.split('/').map(encodeURIComponent).join('/') : null }, null, 2) + '\n');
console.log('Built to dist/. Publish this folder to any static hosting service.');
console.log(photo ? 'Profile photo: ' + photo : 'No photo yet. Add a portrait and run the build again.');
