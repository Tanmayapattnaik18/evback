const Author = require('../models/author');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../DB.json');
const readDB = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));


exports.createAuthor = async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getPostsByAuthor = async (req, res) => {
    const posts = readDB();
    const authorPosts = posts.filter((post) => post.author === req.params.name);
    res.status(200).json(authorPosts);
};
