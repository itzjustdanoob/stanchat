require('dotenv').config({ quiet: true });
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const supabase = require('../supabase');

let resend = null;
try {
  const { Resend } = require('resend');
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
} catch {
  resend = null;
}

const resetTokens = new Map();

async function sendResetEmail({ email, username, code }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Password reset email is not configured');
  }

  const emailPayload = {
    from: 'StanChat <onboarding@resend.dev>',
    to: email,
    subject: 'Your StanChat password reset code',
    html: `
      <h2>Password Reset</h2>
      <p>Hi ${username},</p>
      <p>Your reset code is: <strong style="font-size:24px">${code}</strong></p>
      <p>This code expires in 15 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  };

  if (resend) {
    await resend.emails.send(emailPayload);
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    throw new Error('Could not send reset email');
  }
}

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const { data: user, error } = await supabase
    .from('users')
    .select('id, username')
    .eq('email', email)
    .single();

  if (error || !user)
    return res.status(404).json({ error: 'No account with that email' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  resetTokens.set(email, { code, expires: Date.now() + 15 * 60 * 1000 });

  try {
    await sendResetEmail({ email, username: user.username, code });
  } catch (sendError) {
    resetTokens.delete(email);
    return res.status(500).json({ error: sendError.message });
  }

  res.json({ message: 'Reset code sent to your email' });
});

router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword)
    return res.status(400).json({ error: 'All fields required' });

  const record = resetTokens.get(email);
  if (!record) return res.status(400).json({ error: 'No reset requested for this email' });
  if (Date.now() > record.expires) {
    resetTokens.delete(email);
    return res.status(400).json({ error: 'Code expired, request a new one' });
  }
  if (record.code !== code)
    return res.status(400).json({ error: 'Invalid code' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const { error } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('email', email);

  if (error) return res.status(500).json({ error: error.message });

  resetTokens.delete(email);
  res.json({ message: 'Password reset successfully' });
});

module.exports = router;
