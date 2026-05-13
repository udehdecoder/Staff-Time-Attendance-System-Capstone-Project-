module.exports = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied - No permissions",
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};