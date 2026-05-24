const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  },
);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// --- my additions ---
router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

router
  .route("/:id")
  .get(authMiddleware, roleMiddleware(["admin"]), getUserById)
  .put(authMiddleware, roleMiddleware(["admin"]), updateUser)
  .delete(authMiddleware, roleMiddleware(["admin"]), deleteUser);

module.exports = router;
