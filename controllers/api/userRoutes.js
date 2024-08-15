const router = require('express').Router();
const { User } = require('../../models');

// GET all users http://localhost:3001/api/users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new user http://localhost:3001/api/users Body: { "username": "newuser", "password": "password123" }
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST user login http://localhost:3001/api/users/login Body: { "username": "newuser", "password": "password123" }
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
