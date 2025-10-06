import User from '../Models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async(req,res) =>{
    const{name ,email,password}  = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const login = async(req,res) =>{
    const{email,password} = req.body;

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({error: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(401).json({error: 'Invalid credentials'})
    }

    const token = jwt.sign({id: user._id}, 'your_jwt_secret', {expiresIn: '1h'})
    res.status(200).json({User , token})
}