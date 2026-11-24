import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const dist = 'dist';
const file = (f) => readFileSync(join(dist, f), 'utf8');
const html = file('index.html');
const domain = 'www.hariharafabrictionsandconstructions.in';
assert(!html.includes('%BASE_URL%'), 'Unexpanded Vite base path');
assert(!html.includes('/hari_hara/'), 'Unexpected repository path on custom-domain release');
assert(html.includes('/favicon.ico?v=8'), 'Missing cache-busted ICO reference');
assert(html.includes('/favicon-32x32.png?v=8'), 'Missing PNG favicon');
assert(html.includes('<div id="root">'), 'Missing React root');
assert(html.includes('src="/logo-original.png"'), 'Missing no-JS fallback logo');
for(const path of ['404.html','favicon.ico','favicon-32x32.png','favicon-16x16.png','apple-touch-icon.png','logo-original.png','robots.txt','sitemap.xml','CNAME']) {
  assert(existsSync(join(dist,path)), `Missing ${path}`);
}
assert.equal(file('CNAME').trim(),domain);
assert(file('sitemap.xml').includes(`https://${domain}/`));
const refs=[...html.matchAll(/(?:src|href)="(\/(?:assets\/[^"?#]+))(?=["?#])/g)].map(m=>m[1]);
assert(refs.some(r=>r.endsWith('.js')), 'No compiled JavaScript reference');
assert(refs.some(r=>r.endsWith('.css')), 'No compiled stylesheet reference');
for(const ref of refs) assert(existsSync(join(dist,ref.slice(1))), `Missing compiled asset: ${ref}`);
const js = readdirSync(join(dist,'assets')).filter(f=>f.endsWith('.js'));
assert(js.length>0,'No compiled JS bundles');
console.log(`PASS: Production dist integrity: ${refs.length} JS/CSS entries, 4 favicons, logo, SEO, Pages domain and 404.`);
