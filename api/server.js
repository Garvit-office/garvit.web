import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

// ------------------- CORS FIX -------------------
const allowedOrigins = [
  "https://garvit-web-jhiz.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// ------------------- File Paths -------------------
const postsFile = path.join(process.cwd(), 'posts.json');
const poemsFile = path.join(process.cwd(), 'poems.json');

// ------------------- File Helpers -------------------
const loadFile = (file) => {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) { console.error("Error loading:", e); }
  return [];
};
const saveFile = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) { console.error("Error saving:", e); }
};

// ------------------- Email Notifier -------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const sendNotificationEmail = async (type, data) => {
  try {
    let subject = "";
    let html = "";

    if (type === 'like') {
      subject = `New Like on Your Content - ${data.visitorName}`;
      html = `
        <h2>Someone liked your content 👍</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Content:</strong> ${data.postContent}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    if (type === 'comment') {
      subject = `New Comment - ${data.visitorName}`;
      html = `
        <h2>New comment received 💬</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Comment:</strong> ${data.commentText}</p>
        <p><strong>Content:</strong> ${data.postContent}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "garvitchawla.office@gmail.com",
      subject,
      html
    });

  } catch (err) {
    console.error("Email error:", err);
  }
};

// ------------------- Contact Form Email -------------------
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message)
      return res.status(400).json({ success: false, message: "All fields required" });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "garvitchawla.office@gmail.com",
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    res.json({ success: true, message: "Email sent!" });

  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// ------------------- HEALTH -------------------
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// ------------------- POSTS API -------------------
app.get('/api/posts', (req, res) => {
  res.json({ success: true, posts: loadFile(postsFile) });
});

app.post('/api/posts', (req, res) => {
  const { content, images } = req.body;

  if (!content && (!images || images.length === 0))
    return res.status(400).json({ success: false, message: "Post must have content or images" });

  const posts = loadFile(postsFile);
  const newPost = {
    id: Date.now().toString(),
    content: content || "",
    images: images || [],
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    liked: false,
    comments_list: [],
    likes_by: []
  };

  posts.unshift(newPost);
  saveFile(postsFile, posts);

  res.json({ success: true, post: newPost });
});

app.put('/api/posts/:id/like', (req, res) => {
  const posts = loadFile(postsFile);
  const post = posts.find(p => p.id === req.params.id);

  if (!post) return res.status(404).json({ success: false, message: "Not found" });

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  saveFile(postsFile, posts);
  res.json({ success: true, post });
});

app.delete('/api/posts/:id', (req, res) => {
  const posts = loadFile(postsFile);
  const newPosts = posts.filter(p => p.id !== req.params.id);

  if (newPosts.length === posts.length)
    return res.status(404).json({ success: false, message: "Post not found" });

  saveFile(postsFile, newPosts);
  res.json({ success: true, message: "Deleted" });
});

// Comment on post
app.post('/api/posts/:id/comment', async (req, res) => {
  const { visitorName, commentText } = req.body;

  if (!visitorName || !commentText)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const posts = loadFile(postsFile);
  const post = posts.find(p => p.id === req.params.id);

  if (!post) return res.status(404).json({ success: false, message: "Not found" });

  const newComment = {
    id: Date.now().toString(),
    visitorName,
    text: commentText,
    timestamp: new Date().toISOString()
  };

  post.comments_list.push(newComment);
  post.comments = post.comments_list.length;

  saveFile(postsFile, posts);

  await sendNotificationEmail("comment", {
    visitorName,
    commentText,
    postContent: post.content.substring(0, 100)
  });

  res.json({ success: true, comment: newComment });
});

// Visitor like
app.put('/api/posts/:id/visitor-like', async (req, res) => {
  const { visitorName } = req.body;

  if (!visitorName)
    return res.status(400).json({ success: false, message: "Name required" });

  const posts = loadFile(postsFile);
  const post = posts.find(p => p.id === req.params.id);

  if (!post) return res.status(404).json({ success: false, message: "Not found" });

  const alreadyLiked = post.likes_by.includes(visitorName);

  if (alreadyLiked) {
    post.likes_by = post.likes_by.filter(n => n !== visitorName);
    post.likes--;
  } else {
    post.likes_by.push(visitorName);
    post.likes++;
    await sendNotificationEmail("like", {
      visitorName,
      postContent: post.content
    });
  }

  saveFile(postsFile, posts);
  res.json({ success: true, likes: post.likes, liked: !alreadyLiked });
});

// ------------------- POEMS API -------------------
app.get('/api/poems', (req, res) => {
  res.json(loadFile(poemsFile));
});

app.post('/api/poems', (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !category || !content)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const poems = loadFile(poemsFile);

  const newPoem = {
    id: Date.now().toString(),
    title,
    category,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    comments_list: [],
    likes_by: []
  };

  poems.unshift(newPoem);
  saveFile(poemsFile, poems);

  res.json({ success: true, poem: newPoem });
});

app.delete('/api/poems/:id', (req, res) => {
  const poems = loadFile(poemsFile);
  const newPoems = poems.filter(p => p.id !== req.params.id);

  if (newPoems.length === poems.length)
    return res.status(404).json({ success: false, message: "Not found" });

  saveFile(poemsFile, newPoems);
  res.json({ success: true, message: "Deleted" });
});

app.post('/api/poems/:id/comment', async (req, res) => {
  const { visitorName, commentText } = req.body;

  if (!visitorName || !commentText)
    return res.status(400).json({ success: false, message: "Missing" });

  const poems = loadFile(poemsFile);
  const poem = poems.find(p => p.id === req.params.id);

  if (!poem) return res.status(404).json({ success: false, message: "Not found" });

  const newComment = {
    id: Date.now().toString(),
    visitorName,
    text: commentText,
    timestamp: new Date().toISOString()
  };

  poem.comments_list.push(newComment);
  poem.comments = poem.comments_list.length;

  saveFile(poemsFile, poems);

  await sendNotificationEmail("comment", {
    visitorName,
    commentText,
    postContent: poem.title
  });

  res.json({ success: true, comment: newComment });
});

app.put('/api/poems/:id/visitor-like', async (req, res) => {
  const { visitorName } = req.body;

  if (!visitorName)
    return res.status(400).json({ success: false, message: "Name required" });

  const poems = loadFile(poemsFile);
  const poem = poems.find(p => p.id === req.params.id);

  if (!poem) return res.status(404).json({ success: false, message: "Not found" });

  const alreadyLiked = poem.likes_by.includes(visitorName);

  if (alreadyLiked) {
    poem.likes_by = poem.likes_by.filter(n => n !== visitorName);
    poem.likes--;
  } else {
    poem.likes_by.push(visitorName);
    poem.likes++;

    await sendNotificationEmail("like", {
      visitorName,
      postContent: poem.title
    });
  }

  saveFile(poemsFile, poems);
  res.json({ success: true, likes: poem.likes, liked: !alreadyLiked });
});

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
