import express from 'express';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await sendContactEmail({ name, email, subject, message });
    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default router;
