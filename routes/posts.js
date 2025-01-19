const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/', validate, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', validate, updatePost);
router.delete('/:id', deletePost);

module.exports = router;
