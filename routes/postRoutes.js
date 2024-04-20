const express = require('express');
const router = express.Router();

// Dummy data for demonstration purposes
let posts = [
    { id: 1, title: "First Post", content: "This is the content of the first post.", likes: 0 },
    { id: 2, title: "Second Post", content: "This is the content of the second post.", likes: 0 }
];

// Get all posts
router.get('/posts', (req, res) => {
    res.json(posts);
});

// Create a new post
router.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content, likes: 0 };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Like a post
router.post('/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.likes++;
        res.status(200).json(post);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

module.exports = router;