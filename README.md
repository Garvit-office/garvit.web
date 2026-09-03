## Email Setup

To receive contact form emails, set these variables in `api/.env`:

```env
GMAIL_USER=your-sending-gmail@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
RECEIVER_EMAIL=your-inbox@gmail.com
```

If `RECEIVER_EMAIL` is omitted, emails will be delivered to `GMAIL_USER`.

## Deployment

Deploy the Next.js frontend and Express API as separate services:

1. Frontend: run `npm ci`, `npm run build`, and `npm start`. Set `API_SERVER_URL` to the public API URL.
2. API: use `api` as the service root, run `npm ci`, and start with `npm start`. Copy `api/.env.example` to configure MongoDB and email credentials.
3. Set `ALLOWED_ORIGINS` on the API to the exact frontend origin and use `/health` as the API health check.

The frontend rewrite keeps browser requests on `/api/*` while proxying them to `API_SERVER_URL`.


