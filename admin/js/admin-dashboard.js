// Admin dashboard JS
const API_BASE = 'https://YOUR_SERVERLESS_DOMAIN/api'; // replace after deploy
const UPLOAD_ENDPOINT = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // replace after deploy

(function(){
  const token = localStorage.getItem('ml_token');
  if (!token) location.href = 'login.html';
})();

async function uploadFileToDrive(file, sheetId) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async function(ev) {
      try {
        const b64 = ev.target.result.split(',')[1];
        const res = await fetch(UPLOAD_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({ fileName: file.name, mimeType: file.type, content: b64, sheetId: sheetId })
        });
        const j = await res.json();
        if (j && j.success) resolve(j);
        else reject(j);
      } catch (e) { reject(e); }
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    status.innerHTML = '<p>Preparing...</p>';
    const title = document.getElementById('title').value.trim();
    const summary = document.getElementById('summary').value.trim();
    const fileInput = document.getElementById('file');
    let imageUrl = document.getElementById('image').value.trim();
    const sheetId = document.getElementById('sheetId').value.trim();
    const mediaList = [];

    if (fileInput && fileInput.files && fileInput.files[0]) {
      try {
        status.innerHTML = '<p>Uploading file to Drive...</p>';
        const up = await uploadFileToDrive(fileInput.files[0], sheetId || null);
        imageUrl = up.url;
        mediaList.push({ name: up.name, url: up.url, id: up.id, mimeType: fileInput.files[0].type });
      } catch (err) {
        status.innerHTML = '<p style="color:crimson">Drive upload failed: ' + (err.error || err) + '</p>';
        return;
      }
    }

    const post = {
      title, summary, image: imageUrl, author: document.getElementById('author').value || 'Admin',
      date: document.getElementById('date').value || (new Date().toISOString().split('T')[0]),
      content: document.getElementById('content').value || '',
      type: 'article',
      category: document.getElementById('category').value || '',
      media: mediaList,
      logToSheet: !!sheetId,
      sheetId: sheetId,
      sheetWebhook: UPLOAD_ENDPOINT // optional, here we use Apps Script directly for logging in Apps Script
    };

    status.innerHTML = '<p>Publishing to GitHub...</p>';
    try {
      const resp = await fetch(API_BASE + '/publish', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer ' + localStorage.getItem('ml_token') },
        body: JSON.stringify({ post })
      });
      const j = await resp.json();
      if (j.success) {
        status.innerHTML = '<p style="color:green">Published to GitHub successfully.</p>';
      } else {
        status.innerHTML = '<p style="color:crimson">Publish failed: ' + (j.error || JSON.stringify(j)) + '</p>';
      }
    } catch (e) {
      status.innerHTML = '<p style="color:crimson">Publish error: ' + e.message + '</p>';
    }
  });
});
