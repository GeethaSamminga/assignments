const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userschema");
const { userValidationSchema, loginValidationSchema } = require("../validation/uservalidation");

// Register
const register = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.map(err => ({
        field: err.context.key,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    const { name, email, password, role } = req.body;

    
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role});
    await user.save();

    const savedUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ message: "User registered successfully", savedUser });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.map(err => ({
        field: err.context.key,
        message: err.message,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User need to register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all users
const getallUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const users = await User.find();
    res.status(200).json({ message: "Get users successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register, login, getallUsers };
