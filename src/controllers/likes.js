const {
  addLike,
  removeLike,
  fetchPostLikes,
  fetchUserLikedPosts,
} = require("../models/like");
const logger = require("../utils/logger");

/**
 * Like a post
 */
const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.post_id);

    await addLike(userId, postId);
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    logger.critical("Like post error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Unlike a post
 */
const unlikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.post_id);

    await removeLike(userId, postId);
    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    logger.critical("Unlike post error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all users who liked a specific post
 */

const getPostLikes = async (req, res) => {
  try {
    const postId = parseInt(req.params.post_id);

    const likes = await fetchPostLikes(postId);
    res.json({ likes });
  } catch (error) {
    logger.critical("Get post likes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all posts liked by a specific user
 */
const getUserLikes = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);

    const likedPosts = await fetchUserLikedPosts(userId);
    res.json({ likedPosts });
  } catch (error) {
    logger.critical("Get user likes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  likePost,
  unlikePost,
  getPostLikes,
  getUserLikes,
};
