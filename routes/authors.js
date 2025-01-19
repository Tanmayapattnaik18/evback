const express = require('express');
const { createAuthor, getAllAuthors, getPostsByAuthor } = require('../controllers/authorController');

const router = express.Router();

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.get('/:name/posts', getPostsByAuthor);

module.exports = router;
