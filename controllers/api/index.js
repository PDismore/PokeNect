const router = require("express").Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
const followRoutes = require('./follow-routes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/follow', followRoutes);

module.exports = router;
