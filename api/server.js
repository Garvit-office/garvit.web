// MongoDB setup
import { MongoClient } from 'mongodb';
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://garvitchawlaoffice_db_user:zhy3gnkrH6t4nexn@cluster0.7ol2xzl.mongodb.net/?appName=Cluster0';
const client = new MongoClient(mongoUri);
let db;
client.connect()
  .then(() => {
    db = client.db('portfolio'); // Use 'portfolio' as the database name
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

dotenv.config();
dotenv.config();
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import postsRouter from './routes/posts.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();

// Root route for health/info
app.get('/', (req, res) => {
  res.send('API server is running');
});

// ------------------- CORS FIX -------------------
const allowedOrigins = [
  "https://garvit-web-jhiz.vercel.app",
  "https://garvit-web-at6j.vercel.app",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://192.168.35.65:8081"
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

// Register modular routes
app.use('/api/posts', postsRouter);
app.use('/api/contact', contactRouter);

// ------------------- File Paths -------------------
const postsFile = path.join(process.cwd(), 'posts.json');
const poemsFile = path.join(process.cwd(), 'poems.json');

// ...existing code...

// ------------------- HEALTH -------------------
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// ------------------- POSTS API (MongoDB) -------------------
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.collection('posts').find({}).sort({ timestamp: -1 }).toArray();
    res.json({ success: true, posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { content, images } = req.body;
  if (!content && (!images || images.length === 0))
    return res.status(400).json({ success: false, message: "Post must have content or images" });
  const newPost = {
    content: content || "",
    images: images || [],
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    liked: false,
    comments_list: [],
    likes_by: []
  };
  try {
    const result = await db.collection('posts').insertOne(newPost);
    newPost._id = result.insertedId;
    res.json({ success: true, post: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
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

// ------------------- POEMS API (MongoDB) -------------------
app.get('/api/poems', async (req, res) => {
  try {
    const poems = await db.collection('poems').find({}).sort({ timestamp: -1 }).toArray();
    res.json(poems);
  } catch (err) {
    console.error('Error fetching poems:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch poems' });
  }
});

app.post('/api/poems', async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content)
    return res.status(400).json({ success: false, message: "Missing fields" });
  const newPoem = {
    title,
    category,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    comments_list: [],
    likes_by: []
  };
  try {
    const result = await db.collection('poems').insertOne(newPoem);
    newPoem._id = result.insertedId;
    res.json({ success: true, poem: newPoem });
  } catch (err) {
    console.error('Error creating poem:', err);
    res.status(500).json({ success: false, message: 'Failed to create poem' });
  }
});

// ------------------- VISITOR TRACKING (MongoDB) -------------------
app.post('/api/visitor', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date().toISOString();
  try {
    await db.collection('visitors').insertOne({ ip, timestamp });
    res.json({ success: true });
  } catch (err) {
    console.error('Error logging visitor:', err);
    res.status(500).json({ success: false });
  }
});

// Delete poem (MongoDB)
app.delete('/api/poems/:id', async (req, res) => {
  try {
    const result = await db.collection('poems').deleteOne({ _id: new require('mongodb').ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error('Error deleting poem:', err);
    res.status(500).json({ success: false, message: 'Failed to delete poem' });
  }
});

// Comment on poem (MongoDB)
app.post('/api/poems/:id/comment', async (req, res) => {
  const { visitorName, commentText } = req.body;
  if (!visitorName || !commentText)
    return res.status(400).json({ success: false, message: "Missing" });
  const newComment = {
    visitorName,
    text: commentText,
    timestamp: new Date().toISOString()
  };
  try {
    const result = await db.collection('poems').findOneAndUpdate(
      { _id: new require('mongodb').ObjectId(req.params.id) },
      { $push: { comments_list: newComment }, $inc: { comments: 1 } },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ success: false, message: "Not found" });
    await sendNotificationEmail("comment", {
      visitorName,
      commentText,
      postContent: result.value.title
    });
    res.json({ success: true, comment: newComment });
  } catch (err) {
    console.error('Error commenting on poem:', err);
    res.status(500).json({ success: false, message: 'Failed to comment' });
  }
});

// Visitor like on poem (MongoDB)
app.put('/api/poems/:id/visitor-like', async (req, res) => {
  const { visitorName } = req.body;
  if (!visitorName)
    return res.status(400).json({ success: false, message: "Name required" });
  try {
    const poem = await db.collection('poems').findOne({ _id: new require('mongodb').ObjectId(req.params.id) });
    if (!poem) return res.status(404).json({ success: false, message: "Not found" });
    const alreadyLiked = poem.likes_by.includes(visitorName);
    let update;
    if (alreadyLiked) {
      update = {
        $pull: { likes_by: visitorName },
        $inc: { likes: -1 }
      };
    } else {
      update = {
        $push: { likes_by: visitorName },
        $inc: { likes: 1 }
      };
      await sendNotificationEmail("like", {
        visitorName,
        postContent: poem.title
      });
    }
    await db.collection('poems').updateOne({ _id: new require('mongodb').ObjectId(req.params.id) }, update);
    const updated = await db.collection('poems').findOne({ _id: new require('mongodb').ObjectId(req.params.id) });
    res.json({ success: true, likes: updated.likes, liked: !alreadyLiked });
  } catch (err) {
    console.error('Error liking poem:', err);
    res.status(500).json({ success: false, message: 'Failed to like' });
  }
});

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
