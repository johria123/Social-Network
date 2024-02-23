const router = require('express').Router();
const userRoutes = require('./user Routes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/user', usereRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;