import express from 'express'
import Admin from '../modle/Admin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router =express.Router()

router.post('/', async (req, res) => { //register
    const { name, email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
        return res.json({ message: "User already exists" });
        
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
        name,
        email,
        password: hashPassword
    });

    await newAdmin.save();
    return res.json({ message: "Registered" });
});

router.post('/login', async (req, res) => { //Login
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email " });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            // Secure: true, // Uncomment in production if served over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
        });
        
        return res.json({ status: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default router