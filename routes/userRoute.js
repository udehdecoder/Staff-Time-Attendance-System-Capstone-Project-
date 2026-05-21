const express = require("express");
const router = express.Router();
const {updateStaff} = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);


router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user
  });
});



router.patch("/:id", authMiddleware, updateStaff);



module.exports = router;

