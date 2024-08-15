const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const commentRoutes = require('./api/commentRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
