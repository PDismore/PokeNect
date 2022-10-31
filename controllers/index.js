const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homepage-routes");
const userRoutes = require("./userpage-routes");
const feedRoutes = require("./feedpage-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/user", userRoutes);
router.use("/feed", feedRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
