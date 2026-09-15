import assert from 'node:assert/strict';

// HTTP integration checks, not browser or visual tests. Run against a local
// development or production server: npm run check:routes -- http://localhost:3001
const base = new URL(process.argv[2] || 'http://localhost:3000');
assert(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Use a local server for these checks.');
const queue = ['/', '/capabilities', '/work', '/about', '/insights', '/contact'];
const pages = new Map();
const titles = new Set();
const descriptionValues = new Set();
const unescape = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const attribute = (tag, name) => unescape(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] || '');

while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: expected a successful route`);
  const raw = await response.text();
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${path}: one main landmark`);
  assert.equal((html.match(/<header\b[^>]*class="site-header"/g) || []).length, 1, `${path}: one shared header`);
  assert.equal((html.match(/<footer\b[^>]*class="site-footer"/g) || []).length, 1, `${path}: one shared footer`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  assert(title?.includes('372 GeoMedia'), `${path}: branded page title`);
  assert(!titles.has(title), `${path}: page-specific title`);
  titles.add(title);
  const descriptionTag = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'name') === 'description');
  const description = attribute(descriptionTag || '', 'content');
  assert(description.length > 30, `${path}: useful metadata description`);
  assert(!descriptionValues.has(description), `${path}: page-specific description`);
  descriptionValues.add(description);

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: unique DOM IDs`);
  const links = [...html.matchAll(/<a\b[^>]*>/g)].map(match => attribute(match[0], 'href'));
  for (const href of links) {
    assert(href, `${path}: no empty link destinations`);
    if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `${path}: existing fragment ${href}`);
    const target = new URL(href, new URL(path, base));
    if (target.origin === base.origin && !pages.has(target.pathname)) queue.push(target.pathname);
    assert(!/^https?:\/\/372geomedia\.com/.test(href), `${path}: company navigation should stay local`);
  }
  const nav = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert(nav, `${path}: desktop navigation rendered`);
  const currentLink = [...nav.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).find(tag => attribute(tag, 'aria-current') === 'page');
  if (path === '/') assert(!currentLink, 'Homepage: no unrelated active tab');
  else assert.equal(attribute(currentLink || '', 'href'), `/${path.split('/')[1]}`, `${path}: correct active navigation`);

  if (path === '/contact') {
    const draftHref = links.find(href => href.startsWith('mailto:') && href.includes('?'));
    assert(draftHref, 'Contact: email draft link exists');
    const draft = new URL(draftHref);
    assert.equal(draft.pathname, 'support@372geomedia.com');
    assert(draft.searchParams.get('subject')?.includes('372 GeoMedia'));
    assert(draft.searchParams.get('body')?.includes('understand, connect or build'));
  }
  pages.set(path, html);
}

assert.equal(pages.size, 12, 'All six index/home pages and six detail pages should be reachable.');
for (const path of ['/work/does-not-exist', '/insights/does-not-exist', '/does-not-exist']) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, `${path}: return an actual 404 status`);
  assert((await response.text()).includes('back on course'), `${path}: branded recovery content`);
}
console.log(`Passed: ${pages.size} pages, local navigation, metadata, fragments, email draft and 3 missing-page responses.`);
