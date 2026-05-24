const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Resend } = require('resend');
const supabase = require('../supabase');

const resend = new Resend(process.env.RESEND_API_KEY);

const resetTokens = new Map();

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

  await resend.emails.send({
    from: 'StanChat <onboarding@resend.dev>',
    to: email,
    subject: 'Your StanChat password reset code',
    html: `
      <h2>Password Reset</h2>
      <p>Hi ${user.username},</p>
      <p>Your reset code is: <strong style="font-size:24px">${code}</strong></p>
      <p>This code expires in 15 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });

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
