const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  likePost,
  unlikePost,
  getPostLikes,
  getUserLikes,
} = require("../controllers/likes");

const router = express.Router();

/**
 * Likes routes
 */

// Like a post (requires auth)
router.post("/:post_id", authenticateToken, likePost);

// Unlike a post (requires auth)
router.delete("/:post_id", authenticateToken, unlikePost);

// Get likes for a specific post
router.get("/post/:post_id", getPostLikes);

// Get posts liked by a specific user
router.get("/user/:user_id", getUserLikes);

module.exports = router;
