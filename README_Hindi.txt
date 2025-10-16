Deployment quick steps (Hindi):
1) Upload this project to your GitHub repo (LifeInHills).
2) Deploy Google Apps Script (apps-script/Code.gs) as Web App and copy the Web App URL.
3) Deploy serverless functions (api/) to Vercel:
   - Add environment variables: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN, JWT_SECRET, USERS_JSON
   - USERS_JSON example: [{"email":"your-email","hash":"$2b$10$..."}]
4) Update admin/js/admin-dashboard.js and admin/js/admin-login.js:
   - Set API_BASE = 'https://your-vercel-domain'
   - Set UPLOAD_ENDPOINT = 'https://script.google.com/macros/s/your-id/exec'
5) Enable GitHub Pages to serve frontend or host via static hosting.
