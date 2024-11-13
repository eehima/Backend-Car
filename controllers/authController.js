// import authcontroller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// signup authentication
exports.signup = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await user.create({name, email, password:hashedPassword});
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 

// login authentication

exports.login = async (req,res) => {
    const {email, password} = req.body;
    try {
       const user = await User.findOne({email});
       if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({error: 'Invalid credentials'});
       }
       const token = jwt.sign({ userId:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
       res.json({token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
