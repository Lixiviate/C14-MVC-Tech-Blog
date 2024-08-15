const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// GET all posts http://localhost:3001/api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single post http://localhost:3001/api/posts/{id}
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create new post http://localhost:3001/api/posts Body: { "title": "New Title", "content": "Post content." }
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
