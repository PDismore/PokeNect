const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homepage-routes')

router.use('/api', apiRoutes);
router.use('/homepage', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
  });
  
  module.exports = router;