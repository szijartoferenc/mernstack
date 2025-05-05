import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

// Middleware to authenticate requests with access tokens
export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract token from 'Bearer token'

    if (token == null) {
        return response.status(401).json({ msg: 'Token is missing' });  // Token is required
    }

    // Verify the access token
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: 'Invalid token' });  // Token verification failed
        }

        request.user = user;  // Attach user information to the request object
        next();  // Proceed to the next middleware or route handler
    });
}

// Function to generate a new access token using the refresh token
export const createNewToken = async (request, response) => {
    const refreshToken = request.body.token.split(' ')[1];  // Extract refresh token from request body

    if (!refreshToken) {
        return response.status(401).json({ msg: 'Refresh token is missing' });  // Refresh token required
    }

    try {
        const token = await Token.findOne({ token: refreshToken });  // Check if refresh token exists in the database

        if (!token) {
            return response.status(404).json({ msg: 'Refresh token is not valid' });  // Token not found or invalid
        }

        // Verify the refresh token
        jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(500).json({ msg: 'Invalid refresh token' });  // Refresh token verification failed
            }

            // Create a new access token
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });

            return response.status(200).json({ accessToken: accessToken });  // Return the new access token
        });
    } catch (error) {
        return response.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}
