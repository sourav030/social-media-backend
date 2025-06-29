const express = require("express");
const router = express.Router();
const {
  follow,
  unfollow,
  getMyFollowing,
  getMyFollowers,
  getFollowStats,
  searchUsers,
  getProfileWithStats,
  updateProfile,

} = require("../controllers/users");

const { authenticateToken } = require("../middleware/auth");

router.post("/follow/:user_id", authenticateToken, follow);
router.delete("/unfollow/:user_id", authenticateToken, unfollow);
router.get("/following/me", authenticateToken, getMyFollowing);
router.get("/followers/me", authenticateToken, getMyFollowers);
router.get("/follow-counts/:user_id", getFollowStats);

router.get("/search", searchUsers);
router.get("/profile/:user_id", getProfileWithStats);
router.put("/profile", authenticateToken, updateProfile);



module.exports = router;

// const express = require("express");
// const { authenticateToken } = require("../middleware/auth");

// const router = express.Router();

// /**
//  * User-related routes
//  * TODO: Implement user routes when follow functionality is added
//  */

// // TODO: POST /api/users/follow - Follow a user
// // TODO: DELETE /api/users/unfollow - Unfollow a user
// // TODO: GET /api/users/following - Get users that current user follows
// // TODO: GET /api/users/followers - Get users that follow current user
// // TODO: GET /api/users/stats - Get follow stats for current user
// // TODO: POST /api/users/search - Find users by name

// module.exports = router;
