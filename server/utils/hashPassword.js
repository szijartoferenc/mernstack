// hashPassword.js
import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // 10-es sóval hash-eljük a jelszót
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error('Error hashing password');
    }
};
