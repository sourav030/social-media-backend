const express = require("express");
const { validateRequest, createPostSchema } = require("../utils/validation");
const {
	create,
	getById,
	getUserPosts,
	getMyPosts,
	remove,
	getFeedPosts,
	updatePost,
} = require("../controllers/posts");
const { authenticateToken, optionalAuth } = require("../middleware/auth");

const router = express.Router();

/**
 * Posts routes
 */

// POST /api/posts - Create a new post
router.post("/", authenticateToken, validateRequest(createPostSchema), create);

// GET /api/posts/my - Get current user's posts
router.get("/my", authenticateToken, getMyPosts);
 
// GET /api/posts/feed - Get posts from followed users
// GET /api/posts/feed
// ⛳ Keep this BEFORE any dynamic route like /:post_id
router.get("/feed", authenticateToken, getFeedPosts);

// GET /api/posts/:post_id - Get a single post by ID
router.get("/:post_id", optionalAuth, getById);

// GET /api/posts/user/:user_id - Get posts by a specific user
router.get("/user/:user_id", optionalAuth, getUserPosts);

// DELETE /api/posts/:post_id - Delete a post
router.delete("/:post_id", authenticateToken, remove);

// TODO: Add route for content feed
// GET /api/posts/feed - Get posts from followed users
// GET /api/posts/feed
// router.get("/feed/post", authenticateToken, getFeedPosts);


// TODO: Add route for updating posts
// PUT /api/posts/:post_id - Update a post
// PUT /api/posts/:post_id - Update a post
router.put("/update/:post_id", authenticateToken, updatePost);



module.exports = router;
