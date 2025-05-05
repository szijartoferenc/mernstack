import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/user.js';
import Token from '../model/token.js';
import { hashPassword } from '../utils/hashPassword.js';  // Helyes importálás

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        console.log("Received request body:", request.body);  // ✅ Log incoming data

        if (!request.body.username || !request.body.name || !request.body.password) {
            return response.status(400).json({ msg: 'All fields are required' });
        }

        // Hívjuk meg a hashPassword függvényt a jelszó titkosításához
        const hashedPassword = await hashPassword(request.body.password);

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            password: hashedPassword, // A titkosított jelszó tárolása
        });

        await user.save();
        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        return response.status(500).json({ msg: 'Error while signing up the user' });
    }
};

export const loginUser = async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({ msg: 'Username and password are required' });
    }

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return response.status(400).json({ msg: 'Invalid username or password' });
        }

        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            return response.status(400).json({ msg: 'Invalid username or password' });
        }

        const accessToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.REFRESH_SECRET_KEY
        );

        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        return response.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username
        });

    } catch (error) {
        console.error('Error during login:', error);
        return response.status(500).json({ msg: 'Error while logging in user' });
    }
};
