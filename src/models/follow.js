const { query } = require("../utils/database");

/**
 * Follow a user
 */
const followUser = async (followerId, followingId) => {
  await query(
    `INSERT INTO follows (follower_id, following_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [followerId, followingId]
  );
};

/**
 * Unfollow a user
 */
const unfollowUser = async (followerId, followingId) => {
  await query(
    `DELETE FROM follows
     WHERE follower_id = $1 AND following_id = $2`,
    [followerId, followingId]
  );
};

/**
 * Get users followed by a user
 */
const getFollowing = async (userId) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name
     FROM follows f
     JOIN users u ON f.following_id = u.id
     WHERE f.follower_id = $1`,
    [userId]
  );
  return result.rows;
};

/**
 * Get followers of a user
 */
const getFollowers = async (userId) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name
     FROM follows f
     JOIN users u ON f.follower_id = u.id
     WHERE f.following_id = $1`,
    [userId]
  );
  return result.rows;
};

/**
 * Get total follow stats (followers & following)
 */
const getFollowCounts = async (userId) => {
  const result = await query(
    `SELECT
       (SELECT COUNT(*) FROM follows WHERE follower_id = $1) AS following_count,
       (SELECT COUNT(*) FROM follows WHERE following_id = $1) AS follower_count`,
    [userId]
  );
  return result.rows[0];
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getFollowCounts,
};

// const { query } = require("../utils/database");

// /**
//  * Follow model for managing user relationships
//  * TODO: Implement this model for the follow functionality
//  */

// // TODO: Implement followUser function
// // TODO: Implement unfollowUser function
// // TODO: Implement getFollowing function
// // TODO: Implement getFollowers function
// // TODO: Implement getFollowCounts function

// module.exports = {
// 	// Functions will be implemented here
// };
