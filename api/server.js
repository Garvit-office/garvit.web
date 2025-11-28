import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Posts storage file
const postsFile = path.join(process.cwd(), 'posts.json');

// Poems storage file
const poemsFile = path.join(process.cwd(), 'poems.json');

// Load posts from file
const loadPosts = () => {
  try {
    if (fs.existsSync(postsFile)) {
      return JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }
  return [];
};

// Save posts to file
const savePosts = (posts) => {
  try {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

// Load poems from file
const loadPoems = () => {
  try {
    if (fs.existsSync(poemsFile)) {
      return JSON.parse(fs.readFileSync(poemsFile, 'utf-8'));
    }
  } catch (error) {
    console.error('Error loading poems:', error);
  }
  return [];
};

// Save poems to file
const savePoems = (poems) => {
  try {
    fs.writeFileSync(poemsFile, JSON.stringify(poems, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving poems:', error);
  }
};

// Send notification email to admin
const sendNotificationEmail = async (type, data) => {
  try {
    let subject = '';
    let html = '';

    if (type === 'like') {
      subject = `New Like on Your Post - ${data.visitorName}`;
      html = `
        <h2>Someone liked your post! 👍</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Post:</strong> "${data.postContent.substring(0, 100)}..."</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (type === 'comment') {
      subject = `New Comment on Your Post - ${data.visitorName}`;
      html = `
        <h2>Someone commented on your post! 💬</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Comment:</strong> ${data.commentText}</p>
        <p><strong>Post:</strong> "${data.postContent.substring(0, 100)}..."</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      to: 'garvitchawla.office@gmail.com',
      subject,
      html
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Configure nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'garvitchawla.office@gmail.com',
      to: 'garvitchawla.office@gmail.com',
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply to: ${email}</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET all posts
app.get('/api/posts', (req, res) => {
  try {
    const posts = loadPosts();
    res.json({ success: true, posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch posts', error: error.message });
  }
});

// POST create new post
app.post('/api/posts', (req, res) => {
  try {
    const { content, images } = req.body;

    if (!content && (!images || images.length === 0)) {
      return res.status(400).json({ success: false, message: 'Post must have content or images' });
    }

    const posts = loadPosts();
    const newPost = {
      id: Date.now().toString(),
      content: content || '',
      images: images || [],
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false
    };

    posts.unshift(newPost); // Add to beginning
    savePosts(posts);

    res.json({ success: true, post: newPost, message: 'Post created successfully!' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Failed to create post', error: error.message });
  }
});

// PUT like/unlike post
app.put('/api/posts/:id/like', (req, res) => {
  try {
    const { id } = req.params;
    const posts = loadPosts();
    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;

    savePosts(posts);
    res.json({ success: true, post });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ success: false, message: 'Failed to like post', error: error.message });
  }
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const posts = loadPosts();
    const filteredPosts = posts.filter(p => p.id !== id);

    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    savePosts(filteredPosts);
    res.json({ success: true, message: 'Post deleted successfully!' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, message: 'Failed to delete post', error: error.message });
  }
});

// POST comment on post
app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName, commentText } = req.body;

    if (!visitorName || !commentText) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    const posts = loadPosts();
    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Initialize comments array if doesn't exist
    if (!post.comments_list) {
      post.comments_list = [];
    }

    const newComment = {
      id: Date.now().toString(),
      visitorName,
      text: commentText,
      timestamp: new Date().toISOString()
    };

    post.comments_list.push(newComment);
    post.comments = post.comments_list.length;

    savePosts(posts);

    // Send notification to admin
    await sendNotificationEmail('comment', {
      visitorName,
      commentText,
      postContent: post.content
    });

    res.json({ success: true, comment: newComment, message: 'Comment posted successfully!' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ success: false, message: 'Failed to post comment', error: error.message });
  }
});

// PUT like on post
app.put('/api/posts/:id/visitor-like', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName } = req.body;

    if (!visitorName) {
      return res.status(400).json({ success: false, message: 'Visitor name is required' });
    }

    const posts = loadPosts();
    const post = posts.find(p => p.id === id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Initialize likes_by array if doesn't exist
    if (!post.likes_by) {
      post.likes_by = [];
    }

    // Check if visitor already liked
    const alreadyLiked = post.likes_by.includes(visitorName);

    if (alreadyLiked) {
      post.likes_by = post.likes_by.filter(name => name !== visitorName);
      post.likes--;
    } else {
      post.likes_by.push(visitorName);
      post.likes++;

      // Send notification to admin
      await sendNotificationEmail('like', {
        visitorName,
        postContent: post.content
      });
    }

    savePosts(posts);
    res.json({ success: true, likes: post.likes, liked: !alreadyLiked });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ success: false, message: 'Failed to like post', error: error.message });
  }
});

// ========== POEMS ENDPOINTS ==========

// GET all poems
app.get('/api/poems', (req, res) => {
  try {
    const poems = loadPoems();
    res.json(poems);
  } catch (error) {
    console.error('Error fetching poems:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch poems' });
  }
});

// POST new poem
app.post('/api/poems', (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ success: false, message: 'Title, category, and content are required' });
    }

    const poems = loadPoems();
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
    savePoems(poems);
    res.json({ success: true, poem: newPoem });
  } catch (error) {
    console.error('Error creating poem:', error);
    res.status(500).json({ success: false, message: 'Failed to create poem', error: error.message });
  }
});

// DELETE poem
app.delete('/api/poems/:id', (req, res) => {
  try {
    const { id } = req.params;
    const poems = loadPoems();
    const filteredPoems = poems.filter(p => p.id !== id);

    if (filteredPoems.length === poems.length) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    savePoems(filteredPoems);
    res.json({ success: true, message: 'Poem deleted successfully!' });
  } catch (error) {
    console.error('Error deleting poem:', error);
    res.status(500).json({ success: false, message: 'Failed to delete poem', error: error.message });
  }
});

// POST comment on poem
app.post('/api/poems/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName, commentText } = req.body;

    if (!visitorName || !commentText) {
      return res.status(400).json({ success: false, message: 'Name and comment are required' });
    }

    const poems = loadPoems();
    const poem = poems.find(p => p.id === id);

    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (!poem.comments_list) {
      poem.comments_list = [];
    }

    const newComment = {
      id: Date.now().toString(),
      visitorName,
      text: commentText,
      timestamp: new Date().toISOString()
    };

    poem.comments_list.push(newComment);
    poem.comments = poem.comments_list.length;

    savePoems(poems);

    await sendNotificationEmail('comment', {
      visitorName,
      commentText,
      postContent: poem.content.substring(0, 100)
    });

    res.json({ success: true, comment: newComment, message: 'Comment posted successfully!' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ success: false, message: 'Failed to post comment', error: error.message });
  }
});

// PUT like on poem
app.put('/api/poems/:id/visitor-like', async (req, res) => {
  try {
    const { id } = req.params;
    const { visitorName } = req.body;

    if (!visitorName) {
      return res.status(400).json({ success: false, message: 'Visitor name is required' });
    }

    const poems = loadPoems();
    const poem = poems.find(p => p.id === id);

    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    if (!poem.likes_by) {
      poem.likes_by = [];
    }

    const alreadyLiked = poem.likes_by.includes(visitorName);

    if (alreadyLiked) {
      poem.likes_by = poem.likes_by.filter(name => name !== visitorName);
      poem.likes--;
    } else {
      poem.likes_by.push(visitorName);
      poem.likes++;

      await sendNotificationEmail('like', {
        visitorName,
        postContent: poem.title
      });
    }

    savePoems(poems);
    res.json({ success: true, likes: poem.likes, liked: !alreadyLiked });
  } catch (error) {
    console.error('Error liking poem:', error);
    res.status(500).json({ success: false, message: 'Failed to like poem', error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
