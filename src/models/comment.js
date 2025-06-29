const { query } = require("../utils/database");

// Create a new comment
const createComment = async (postId, userId, content) => {
  const result = await query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [postId, userId, content]
  );
  return result.rows[0];
};

// Update a comment (only by owner)
const updateComment = async (commentId, userId, content) => {
  const result = await query(
    `UPDATE comments
     SET content = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [content, commentId, userId]
  );
  return result.rows[0];
};

// Delete a comment (only by owner)
const deleteComment = async (commentId, userId) => {
  const result = await query(
    `DELETE FROM comments
     WHERE id = $1 AND user_id = $2`,
    [commentId, userId]
  );
  return result.rowCount > 0;
};

// Get comments for a post with pagination
const getPostComments = async (postId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT c.*, u.username FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC
     LIMIT $2 OFFSET $3`,
    [postId, limit, offset]
  );
  return result.rows;
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
};


// const { query } = require("../utils/database");

// /**
//  * Comment model for managing post comments
//  * TODO: Implement this model for the comment functionality
//  */

// // TODO: Implement createComment function
// // TODO: Implement updateComment function
// // TODO: Implement deleteComment function
// // TODO: Implement getPostComments function
// // TODO: Implement getCommentById function

// module.exports = {
// 	// Functions will be implemented here
// };
