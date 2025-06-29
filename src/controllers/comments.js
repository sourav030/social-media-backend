const {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../models/comment");
const logger = require("../utils/logger");

const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { post_id, content } = req.body;
    const comment = await createComment(post_id, userId, content);
    res.status(201).json({ comment });
  } catch (err) {
    logger.critical("Create comment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = parseInt(req.params.comment_id);
    const { content } = req.body;

    const updated = await updateComment(commentId, userId, content);
    if (!updated) return res.status(404).json({ error: "Comment not found or unauthorized" });

    res.json({ message: "Comment updated", comment: updated });
  } catch (err) {
    logger.critical("Update comment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = parseInt(req.params.comment_id);
    const deleted = await deleteComment(commentId, userId);

    if (!deleted) return res.status(404).json({ error: "Comment not found or unauthorized" });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    logger.critical("Delete comment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.post_id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const comments = await getPostComments(postId, limit, offset);
    res.json({ comments, pagination: { page, limit, hasMore: comments.length === limit } });
  } catch (err) {
    logger.critical("Fetch post comments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  create,
  update,
  remove,
  getComments,
};



// // TODO: Implement comments controller
// // This controller should handle:
// // - Creating comments on posts
// // - Editing user's own comments
// // - Deleting user's own comments
// // - Getting comments for a post
// // - Pagination for comments

// const logger = require("../utils/logger");

// // TODO: Implement createComment function
// // TODO: Implement updateComment function
// // TODO: Implement deleteComment function
// // TODO: Implement getPostComments function

// module.exports = {
// 	// Functions will be implemented here
// };
