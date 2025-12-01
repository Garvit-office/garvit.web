// app.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

/**
 * Environment variables (set in .env or your hosting environment):
 * - PORT (optional) default 3001
 * - FRONTEND_URL (optional) default "https://garvit-web-jhiz.vercel.app"
 * - GMAIL_USER (required for send-email)
 * - GMAIL_APP_PASSWORD (required for send-email, use App Password)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------- Configuration --------------------
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://garvit-web-jhiz.vercel.app';
const LOCAL_DEVELOPMENT_ORIGIN = 'http://localhost:3000';

// Data files directory
const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const POEMS_FILE = path.join(DATA_DIR, 'poems.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.error('Failed to create data directory:', err);
  process.exit(1);
}

// -------------------- Middleware --------------------
// Limit body size; adjust as needed
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS setup — whitelist frontend + localhost
const allowedOrigins = [FRONTEND_URL, LOCAL_DEVELOPMENT_ORIGIN];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow direct server-to-server/postman (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS error: Origin ${origin} not allowed`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Explicitly handle preflight for all routes
app.options('*', cors());

// Simple request logger (you can replace with morgan in production)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
});

// -------------------- Utilities: File persistence --------------------
const safeReadJSON = async (filePath) => {
  try {
    const exists = await fsPromises.stat(filePath).then(() => true).catch(() => false);
    if (!exists) return [];
    const raw = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error(`Failed to read ${filePath}:`, err);
    return [];
  }
};

const safeWriteJSON = async (filePath, data) => {
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Failed to write ${filePath}:`, err);
    throw err;
  }
};

// -------------------- Email (nodemailer) --------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify transporter on startup (non-blocking)
transporter.verify((err, success) => {
  if (err) {
    console.warn('Nodemailer verification failed — emails may not send. Check GMAIL_USER and GMAIL_APP_PASSWORD.', err);
  } else {
    console.log('Nodemailer configured and ready to send messages.');
  }
});

const sendNotificationEmail = async (type, data) => {
  try {
    let subject = '';
    let html = '';

    if (type === 'like') {
      subject = `New Like on Your Post — ${data.visitorName || 'Anonymous'}`;
      html = `
        <h3>Someone liked your post</h3>
        <p><strong>Visitor:</strong> ${data.visitorName || 'Anonymous'}</p>
        <p><strong>Post:</strong> ${escapeHtml((data.postContent || '').substring(0, 200))}</p>
        <p><small>Time: ${new Date().toLocaleString()}</small></p>
      `;
    } else if (type === 'comment') {
      subject = `New Comment on Your Post — ${data.visitorName || 'Anonymous'}`;
      html = `
        <h3>New comment</h3>
        <p><strong>Visitor:</strong> ${data.visitorName || 'Anonymous'}</p>
        <p><strong>Comment:</strong> ${escapeHtml(data.commentText || '')}</p>
        <p><strong>Post:</strong> ${escapeHtml((data.postContent || '').substring(0, 200))}</p>
        <p><small>Time: ${new Date().toLocaleString()}</small></p>
      `;
    } else {
      subject = data.subject || 'Notification';
      html = `<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      to: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    // Do not throw — log and continue
    console.error('Failed to send notification email:', err?.message || err);
  }
};

// Simple escaping
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// -------------------- Validation helpers --------------------
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const isEmail = (v) => typeof v === 'string' && /\S+@\S+\.\S+/.test(v);

// -------------------- Routes --------------------
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Posts routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await safeReadJSON(POSTS_FILE);
    res.json({ success: true, posts });
  } catch (err) {
    console.error('GET /api/posts error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { content, images } = req.body;

    if (!isNonEmptyString(content) && (!Array.isArray(images) || images.length === 0)) {
      return res.status(400).json({ success: false, message: 'Post must have content or images' });
    }

    const posts = await safeReadJSON(POSTS_FILE);
    const newPost = {
      id: Date.now().toString(),
      content: content ? content.trim() : '',
      images: Array.isArray(images) ? images : [],
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false,
      comments_list: [],
      likes_by: [],
    };

    posts.unshift(newPost);
    await safeWriteJSON(POSTS_FILE, posts);
    res.status(201).json({ success: true, post: newPost, message: 'Post created successfully' });
  } catch (err) {
    console.error('POST /api/posts error:', err);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
});

app.put('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await safeReadJSON(POSTS_FILE);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.liked = !post.liked;
    post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));

    await safeWriteJSON(POSTS_FILE, posts);
    res.json({ success: true, post });
  } catch (err) {
    console.error('PUT /api/posts/:id/like error:', err);
    res.status(500).json({ success: false, message: 'Failed to update like' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await safeReadJSON(POSTS_FILE);
    const filtered = posts.filter((p) => p.id !== id);
    if (filtered.length === posts.length) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    await safeWriteJSON(POSTS_FILE, filtered);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/posts/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete post' });
  }
});

app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName, commentText } = req.body;

    if (!isNonEmptyString(visitorName) || !isNonEmptyString(commentText)) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    const posts = await safeReadJSON(POSTS_FILE);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (!Array.isArray(post.comments_list)) post.comments_list = [];

    const newComment = {
      id: Date.now().toString(),
      visitorName: visitorName.trim(),
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    };

    post.comments_list.push(newComment);
    post.comments = post.comments_list.length;
    await safeWriteJSON(POSTS_FILE, posts);

    // notify admin (best effort)
    sendNotificationEmail('comment', {
      visitorName: newComment.visitorName,
      commentText: newComment.text,
      postContent: post.content,
    });

    res.status(201).json({ success: true, comment: newComment, message: 'Comment posted successfully' });
  } catch (err) {
    console.error('POST /api/posts/:id/comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to post comment' });
  }
});

app.put('/api/posts/:id/visitor-like', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName } = req.body;

    if (!isNonEmptyString(visitorName)) {
      return res.status(400).json({ success: false, message: 'Visitor name is required' });
    }

    const posts = await safeReadJSON(POSTS_FILE);
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (!Array.isArray(post.likes_by)) post.likes_by = [];

    const alreadyLiked = post.likes_by.includes(visitorName.trim());
    if (alreadyLiked) {
      post.likes_by = post.likes_by.filter((n) => n !== visitorName.trim());
      post.likes = Math.max(0, (post.likes || 0) - 1);
    } else {
      post.likes_by.push(visitorName.trim());
      post.likes = (post.likes || 0) + 1;
      sendNotificationEmail('like', { visitorName: visitorName.trim(), postContent: post.content });
    }

    await safeWriteJSON(POSTS_FILE, posts);
    res.json({ success: true, likes: post.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error('PUT /api/posts/:id/visitor-like error:', err);
    res.status(500).json({ success: false, message: 'Failed to process like' });
  }
});

// Poems routes
app.get('/api/poems', async (req, res) => {
  try {
    const poems = await safeReadJSON(POEMS_FILE);
    res.json({ success: true, poems });
  } catch (err) {
    console.error('GET /api/poems error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch poems' });
  }
});

app.post('/api/poems', async (req, res) => {
  try {
    const { title, category, content } = req.body;
    if (!isNonEmptyString(title) || !isNonEmptyString(category) || !isNonEmptyString(content)) {
      return res.status(400).json({ success: false, message: 'Title, category, and content are required' });
    }
    const poems = await safeReadJSON(POEMS_FILE);

    const newPoem = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      comments_list: [],
      likes_by: [],
    };

    poems.unshift(newPoem);
    await safeWriteJSON(POEMS_FILE, poems);
    res.status(201).json({ success: true, poem: newPoem });
  } catch (err) {
    console.error('POST /api/poems error:', err);
    res.status(500).json({ success: false, message: 'Failed to create poem' });
  }
});

app.delete('/api/poems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const poems = await safeReadJSON(POEMS_FILE);
    const filtered = poems.filter((p) => p.id !== id);
    if (filtered.length === poems.length) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }
    await safeWriteJSON(POEMS_FILE, filtered);
    res.json({ success: true, message: 'Poem deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/poems/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete poem' });
  }
});

app.post('/api/poems/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName, commentText } = req.body;

    if (!isNonEmptyString(visitorName) || !isNonEmptyString(commentText)) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    const poems = await safeReadJSON(POEMS_FILE);
    const poem = poems.find((p) => p.id === id);
    if (!poem) return res.status(404).json({ success: false, message: 'Poem not found' });

    if (!Array.isArray(poem.comments_list)) poem.comments_list = [];

    const newComment = {
      id: Date.now().toString(),
      visitorName: visitorName.trim(),
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    };

    poem.comments_list.push(newComment);
    poem.comments = poem.comments_list.length;
    await safeWriteJSON(POEMS_FILE, poems);

    sendNotificationEmail('comment', {
      visitorName: newComment.visitorName,
      commentText: newComment.text,
      postContent: poem.content.substring(0, 200),
    });

    res.status(201).json({ success: true, comment: newComment, message: 'Comment posted successfully' });
  } catch (err) {
    console.error('POST /api/poems/:id/comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to post comment' });
  }
});

app.put('/api/poems/:id/visitor-like', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName } = req.body;

    if (!isNonEmptyString(visitorName)) {
      return res.status(400).json({ success: false, message: 'Visitor name is required' });
    }

    const poems = await safeReadJSON(POEMS_FILE);
    const poem = poems.find((p) => p.id === id);
    if (!poem) return res.status(404).json({ success: false, message: 'Poem not found' });

    if (!Array.isArray(poem.likes_by)) poem.likes_by = [];

    const alreadyLiked = poem.likes_by.includes(visitorName.trim());
    if (alreadyLiked) {
      poem.likes_by = poem.likes_by.filter((n) => n !== visitorName.trim());
      poem.likes = Math.max(0, (poem.likes || 0) - 1);
    } else {
      poem.likes_by.push(visitorName.trim());
      poem.likes = (poem.likes || 0) + 1;
      sendNotificationEmail('like', { visitorName: visitorName.trim(), postContent: poem.title });
    }

    await safeWriteJSON(POEMS_FILE, poems);
    res.json({ success: true, likes: poem.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error('PUT /api/poems/:id/visitor-like error:', err);
    res.status(500).json({ success: false, message: 'Failed to process like' });
  }
});

// Contact / send-email route
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!isNonEmptyString(name) || !isEmail(email) || !isNonEmptyString(subject) || !isNonEmptyString(message)) {
      return res.status(400).json({ success: false, message: 'Name, valid email, subject and message are required' });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      to: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      subject: `New Portfolio Contact: ${subject.trim()}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply to: ${escapeHtml(email.trim())}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('POST /api/send-email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
