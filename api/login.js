const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email & password required' });

  const usersJson = process.env.USERS_JSON;
  if (!usersJson) return res.status(500).json({ error: 'No users configured' });

  let users;
  try { users = JSON.parse(usersJson); } catch(e){ return res.status(500).json({ error: 'Invalid users config' }); }

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '6h' });
  return res.json({ token });
};
