const jwt = require("jsonwebtoken");
const User = require("../models/userschema");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization.startsWith("Bearer")) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user)
      next();
    } catch (error) {
      res.status(401).json({ message: "User must register first" });
    }
  } else {
    return res.status(401).json({
      status: "Fail",
      message: "Not authorized, no token",
    });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  // console.log("Authenticated User:", user);

  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Admins only can do this task." });
  }
};

const isMember = (req, res, next) => {
  const user = req.user;
  console.log("Authenticated User:", user);

  if (!user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (user.role === "user") {
    next();
  } else {
    res.status(403).json({ message: "Access denied." });
  }
};

const checkAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin, isMember, checkAdmin };
