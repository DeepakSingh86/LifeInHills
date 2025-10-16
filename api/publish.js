const { Octokit } = require("@octokit/rest");
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try { jwt.verify(token, process.env.JWT_SECRET); } catch (err) { return res.status(401).json({ error: 'Invalid token' }); }

  const { post } = req.body || {};
  if (!post) return res.status(400).json({ error: 'Post data required' });

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const path = 'data/posts.json';

  try {
    let existing = null;
    try {
      const resp = await octokit.repos.getContent({ owner, repo, path });
      existing = resp.data;
    } catch (err) {
      existing = null;
    }

    let posts = [];
    if (existing && existing.content) {
      const content = Buffer.from(existing.content, 'base64').toString('utf8');
      posts = JSON.parse(content);
    }

    let id = post.id;
    if (!id) id = posts.length ? Math.max(...posts.map(p=>p.id || 0)) + 1 : 1;
    post.id = id;

    const idx = posts.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) posts[idx] = post;
    else posts.unshift(post);

    const newContent = JSON.stringify(posts, null, 2);
    const message = `Site: update posts.json - ${post.title || 'new post'}`;

    const params = {
      owner, repo, path,
      message,
      content: Buffer.from(newContent, 'utf8').toString('base64'),
      committer: { name: "Site Admin", email: "admin@example.com" }
    };
    if (existing && existing.sha) params.sha = existing.sha;

    const put = await octokit.repos.createOrUpdateFileContents(params);

    // Optional Google Sheet logging via Apps Script POST if publish contains sheetId and upload info
    if (post.logToSheet && post.sheetId && post.media) {
      try {
        const fetch = require('node-fetch');
        for (const m of post.media) {
          await fetch(post.sheetWebhook || '', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: m.name, url: m.url, id: m.id, mimeType: m.mimeType, date: new Date().toISOString() })
          });
        }
      } catch (e) {
        // ignore
      }
    }

    return res.json({ success: true, response: put.data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};
