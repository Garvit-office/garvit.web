import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { loadFile, saveFile } from '../services/fileHelpers.js';
import { sendNotificationEmail } from '../services/emailService.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsFile = path.resolve(__dirname, '../posts.json');

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const readPosts = () => {
  const posts = loadFile(postsFile);
  let mutated = false;

  posts.forEach((post) => {
    if (!post.id) {
      post.id = generateId();
      mutated = true;
    }
    if (!Array.isArray(post.images)) {
      post.images = [];
      mutated = true;
    }
    if (typeof post.likes !== 'number' || Number.isNaN(post.likes)) {
      post.likes = 0;
      mutated = true;
    }
    if (!Array.isArray(post.comments_list)) {
      post.comments_list = [];
      mutated = true;
    }
    if (typeof post.comments !== 'number') {
      post.comments = post.comments_list.length;
      mutated = true;
    }
    if (!Array.isArray(post.likes_by)) {
      post.likes_by = [];
      mutated = true;
    }
    if (typeof post.liked !== 'boolean') {
      post.liked = false;
      mutated = true;
    }
  });

  if (mutated) {
    saveFile(postsFile, posts);
  }

  return posts;
};

const getPostPreview = (content = '', images = []) => {
  const trimmed = content.trim();
  if (trimmed) {
    return trimmed.substring(0, 100);
  }
  return images.length ? 'Shared an image' : 'Portfolio update';
};

router.get('/', async (req, res) => {
  const posts = readPosts();
  res.json({ success: true, posts });
});

router.post('/', async (req, res) => {
  const { content, images } = req.body;
  if (!content && (!images || images.length === 0))
    return res.status(400).json({ success: false, message: "Post must have content or images" });
  const newPost = {
    id: generateId(),
    content: content || "",
    images: images || [],
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    liked: false,
    comments_list: [],
    likes_by: []
  };
  const posts = readPosts();
  posts.unshift(newPost);
  saveFile(postsFile, posts);
  res.json({ success: true, post: newPost });
});

router.put('/:id/like', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Not found" });
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  if (post.likes < 0) post.likes = 0;
  saveFile(postsFile, posts);
  res.json({ success: true, post });
});

router.put('/:id/visitor-like', async (req, res) => {
  const { visitorName } = req.body;
  if (!visitorName)
    return res.status(400).json({ success: false, message: "Name required" });

  const posts = readPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Not found" });

  post.likes_by = Array.isArray(post.likes_by) ? post.likes_by : [];
  post.likes = typeof post.likes === 'number' ? post.likes : 0;

  const alreadyLiked = post.likes_by.includes(visitorName);

  if (alreadyLiked) {
    post.likes_by = post.likes_by.filter(name => name !== visitorName);
    post.likes = Math.max(0, post.likes - 1);
  } else {
    post.likes_by.push(visitorName);
    post.likes += 1;
    await sendNotificationEmail("like", {
      visitorName,
      postContent: getPostPreview(post.content, post.images)
    });
  }

  saveFile(postsFile, posts);
  res.json({ success: true, likes: post.likes, liked: !alreadyLiked });
});

router.delete('/:id', (req, res) => {
  const posts = readPosts();
  const newPosts = posts.filter(p => p.id !== req.params.id);
  if (newPosts.length === posts.length)
    return res.status(404).json({ success: false, message: "Post not found" });
  saveFile(postsFile, newPosts);
  res.json({ success: true, message: "Deleted" });
});

router.post('/:id/comment', async (req, res) => {
  const { visitorName, commentText } = req.body;
  if (!visitorName || !commentText)
    return res.status(400).json({ success: false, message: "Missing fields" });
  const posts = readPosts();
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
    postContent: getPostPreview(post.content, post.images)
  });
  res.json({ success: true, comment: newComment });
});

export default router;
