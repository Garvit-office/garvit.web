import express from 'express';
import path from 'path';
import { loadFile, saveFile } from '../services/fileHelpers.js';
import { sendNotificationEmail } from '../services/emailService.js';

const router = express.Router();
const postsFile = path.join(process.cwd(), 'posts.json');

router.get('/', async (req, res) => {
  // ... MongoDB logic can be added here if needed
  const posts = loadFile(postsFile);
  res.json({ success: true, posts });
});

router.post('/', async (req, res) => {
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
  const posts = loadFile(postsFile);
  posts.push(newPost);
  saveFile(postsFile, posts);
  res.json({ success: true, post: newPost });
});

router.put('/:id/like', (req, res) => {
  const posts = loadFile(postsFile);
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Not found" });
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  saveFile(postsFile, posts);
  res.json({ success: true, post });
});

router.delete('/:id', (req, res) => {
  const posts = loadFile(postsFile);
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

export default router;
