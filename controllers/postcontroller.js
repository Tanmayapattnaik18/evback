const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../DB.json');

const readDB = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


exports.createPost = (req, res) => {
    const posts = readDB();
    const newPost = { id: Date.now().toString(), ...req.body };
    posts.push(newPost);
    writeDB(posts);
    res.status(201).json(newPost);
};


exports.getAllPosts = (req, res) => {
    const posts = readDB();
    res.status(200).json(posts);
};


exports.getPostById = (req, res) => {
    const posts = readDB();
    const post = posts.find((p) => p.id === req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
};


exports.updatePost = (req, res) => {
    const posts = readDB();
    const postIndex = posts.findIndex((p) => p.id === req.params.id);
    if (postIndex === -1) return res.status(404).json({ error: 'Post not found' });

    posts[postIndex] = { ...posts[postIndex], ...req.body };
    writeDB(posts);
    res.status(200).json(posts[postIndex]);
};


exports.deletePost = (req, res) => {
    const posts = readDB();
    const updatedPosts = posts.filter((p) => p.id !== req.params.id);
    if (posts.length === updatedPosts.length) return res.status(404).json({ error: 'Post not found' });

    writeDB(updatedPosts);
    res.status(200).json({ message: 'Post deleted successfully' });
};
