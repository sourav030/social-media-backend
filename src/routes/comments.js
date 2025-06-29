const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  create,
  update,
  remove,
  getComments,
} = require("../controllers/comments");

const router = express.Router();

// POST /api/comments - Create a comment
router.post("/", authenticateToken, create);

// PUT /api/comments/:comment_id - Update a comment
router.put("/:comment_id", authenticateToken, update);

// DELETE /api/comments/:comment_id - Delete a comment
router.delete("/:comment_id", authenticateToken, remove);

// GET /api/comments/post/:post_id - Get all comments for a post
router.get("/post/:post_id", getComments);

module.exports = router;


// const express = require("express");
// const { authenticateToken } = require("../middleware/auth");

// const router = express.Router();

// /**
//  * Comments routes
//  * TODO: Implement comment routes when comment functionality is added
//  */

// // TODO: POST /api/comments - Create a comment on a post
// // TODO: PUT /api/comments/:comment_id - Update a comment
// // TODO: DELETE /api/comments/:comment_id - Delete a comment
// // TODO: GET /api/comments/post/:post_id - Get comments for a post

// module.exports = router;
