## Email Setup

To receive contact form emails, set these variables in `api/.env`:

```env
GMAIL_USER=your-sending-gmail@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
RECEIVER_EMAIL=your-inbox@gmail.com
```

If `RECEIVER_EMAIL` is omitted, emails will be delivered to `GMAIL_USER`.


