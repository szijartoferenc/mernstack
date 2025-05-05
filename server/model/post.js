import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    picture: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    categories: {
        type: [String], // Tömbben tárolt string értékek
        default: []
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Automatikusan hozzáad `createdAt` és `updatedAt` mezőket

const Post = mongoose.model('Post', PostSchema);

export default Post;
