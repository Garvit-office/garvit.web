import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

import postsRouter from './routes/posts.js';
import contactRouter from './routes/contact.js';
import { sendNotificationEmail } from './services/emailService.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://garvitchawlaoffice_db_user:zhy3gnkrH6t4nexn@cluster0.7ol2xzl.mongodb.net/?appName=Cluster0';
const mongoDbName = process.env.MONGODB_DB || 'portfolio';
const client = new MongoClient(mongoUri);
let db;

const connectToMongo = async () => {
  try {
    await client.connect();
    db = client.db(mongoDbName);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

connectToMongo();

const ensureDbConnection = (res) => {
  if (!db) {
    res.status(503).json({ success: false, message: 'Database not connected' });
    return false;
  }
  return true;
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }
  return req.socket?.remoteAddress || '';
};

app.use('/api/posts', postsRouter);
app.use('/api/contact', contactRouter);

app.get('/api/ip', (req, res) => {
  res.json({ ip: getClientIp(req) });
});

app.get('/api/poems', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  try {
    const poems = await db.collection('poems').find({}).sort({ timestamp: -1 }).toArray();
    const normalizedPoems = poems.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toString()
    }));
    res.json(normalizedPoems);
  } catch (err) {
    console.error('Error fetching poems:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch poems' });
  }
});

app.post('/api/poems', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
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
    const poem = { ...newPoem, id: result.insertedId.toString() };
    res.json({ success: true, poem });
  } catch (err) {
    console.error('Error creating poem:', err);
    res.status(500).json({ success: false, message: 'Failed to create poem' });
  }
});

app.delete('/api/poems/:id', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  try {
    const poemId = new ObjectId(req.params.id);
    const result = await db.collection('poems').deleteOne({ _id: poemId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting poem:', err);
    res.status(500).json({ success: false, message: 'Failed to delete poem' });
  }
});

app.post('/api/poems/:id/comment', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  const { visitorName, commentText } = req.body;
  if (!visitorName || !commentText) {
    return res.status(400).json({ success: false, message: 'Missing' });
  }
  const newComment = {
    id: Date.now().toString(),
    visitorName,
    text: commentText,
    timestamp: new Date().toISOString()
  };
  try {
    const poemId = new ObjectId(req.params.id);
    const result = await db.collection('poems').findOneAndUpdate(
      { _id: poemId },
      { $push: { comments_list: newComment }, $inc: { comments: 1 } },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    await sendNotificationEmail('comment', {
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

app.put('/api/poems/:id/visitor-like', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  const { visitorName } = req.body;
  if (!visitorName) {
    return res.status(400).json({ success: false, message: 'Name required' });
  }
  try {
    const poemId = new ObjectId(req.params.id);
    const poem = await db.collection('poems').findOne({ _id: poemId });
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    const likesBy = poem.likes_by || [];
    const alreadyLiked = likesBy.includes(visitorName);
    const update = alreadyLiked
      ? { $pull: { likes_by: visitorName }, $inc: { likes: -1 } }
      : { $push: { likes_by: visitorName }, $inc: { likes: 1 } };

    await db.collection('poems').updateOne({ _id: poemId }, update);

    if (!alreadyLiked) {
      await sendNotificationEmail('like', {
        visitorName,
        postContent: poem.title
      });
    }

    const updated = await db.collection('poems').findOne({ _id: poemId });
    res.json({ success: true, likes: updated?.likes ?? 0, liked: !alreadyLiked });
  } catch (err) {
    console.error('Error liking poem:', err);
    res.status(500).json({ success: false, message: 'Failed to like' });
  }
});

app.post('/api/visitor', async (req, res) => {
  if (!ensureDbConnection(res)) return;
  const ip = getClientIp(req);
  const timestamp = new Date().toISOString();
  try {
    await db.collection('visitors').insertOne({ ip, timestamp });
    res.json({ success: true });
  } catch (err) {
    console.error('Error logging visitor:', err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
