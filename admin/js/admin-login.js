const API_BASE = 'https://YOUR_SERVERLESS_DOMAIN/api'; // set your deployed domain

document.getElementById('loginForm') && document.getElementById('loginForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try{
    const r = await fetch(API_BASE + '/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const j = await r.json();
    if (j.token) {
      localStorage.setItem('ml_token', j.token);
      window.location = 'dashboard.html';
    } else {
      document.getElementById('msg').innerText = j.error || 'Login failed';
    }
  }catch(e){
    document.getElementById('msg').innerText = e.message;
  }
});
