const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const User=require("../models/userschema")
// for register
const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields (name, email, password, role) are required' });
        }
        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedpassword = await bcrypt.hash(password, 15);
        
        const user = new User({ name, email, password: hashedpassword, role, phone });

        await user.save();

        const saveduser={
            name: user.name,
            email: user.email,
            role: user.role,
        }

        res.status(201).json({ message: "User registered successfully",saveduser});
    } catch (error) {
        console.error("Error in register:", error); 
        
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email,role:user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get users
const getallUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json({message:"get users successfully",users})
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login,getallUsers};

