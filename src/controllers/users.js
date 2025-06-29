const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getFollowCounts,
} = require("../models/follow");
const {findUsersByName,        
  getUserProfile,         
  updateUserProfile}=require("../models/user")

const logger = require("../utils/logger");

/**
 * Follow a user
 */
const follow = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.user_id);

    if (followerId === followingId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    await followUser(followerId, followingId);
    res.json({ message: "Followed successfully" });
  } catch (error) {
    logger.critical("Follow user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Unfollow a user
 */
const unfollow = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.user_id);

    await unfollowUser(followerId, followingId);
    res.json({ message: "Unfollowed successfully" });
  } catch (error) {
    logger.critical("Unfollow user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get users the current user is following
 */
const getMyFollowing = async (req, res) => {
  try {
    const userId = req.user.id;
    const following = await getFollowing(userId);
    res.json({ following });
  } catch (error) {
    logger.critical("Get my following error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get users who follow the current user
 */
const getMyFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    const followers = await getFollowers(userId);
    res.json({ followers });
  } catch (error) {
    logger.critical("Get my followers error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get follow counts for a user
 */
const getFollowStats = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const counts = await getFollowCounts(userId);
    res.json({ counts });
  } catch (error) {
    logger.critical("Get follow counts error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



/**
 * Search users by name (partial match)
 */

const searchUsers = async (req, res) => {
  try {
    const name = req.Name || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await findUsersByName(name, limit, offset);

    res.json({
      users,
      pagination: {
        page,
        limit,
        hasMore: users.length === limit,
      },
    });
  } catch (error) {
    logger.critical("User search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get a user profile with follower/following counts
 */
const getProfileWithStats = async (req, res) => {
  try {
    const { user_id } = req.params;

    const profile = await getUserProfile(parseInt(user_id));

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ profile });
  } catch (error) {
    logger.critical("Get user profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, password } = req.body;

    const updated = await updateUserProfile(userId, { full_name, password });

    if (!updated) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (error) {
    logger.critical("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // TODO: Implement users controller
// // This controller should handle:
// // - Following a user
// // - Unfollowing a user
// // - Getting users that the current user is following
// // - Getting users that follow the current user
// // - Getting follow counts for a user

// const logger = require("../utils/logger");

// // TODO: Implement follow function
// // TODO: Implement unfollow function
// // TODO: Implement getMyFollowing function
// // TODO: Implement getMyFollowers function

// module.exports = {
// 	// Functions will be implemented here
// };
module.exports = {
  follow,
  unfollow,
  getMyFollowing,
  getMyFollowers,
  getFollowStats,
  searchUsers,
  getProfileWithStats,
  updateProfile,
};