const POSTS_RAW = 'https://raw.githubusercontent.com/DeepakSingh86/LifeInHills/main/data/posts.json';

async function fetchPostsRaw() {
  try {
    const r = await fetch(POSTS_RAW);
    if(!r.ok) return [];
    return await r.json();
  } catch(e) { console.error(e); return []; }
}
