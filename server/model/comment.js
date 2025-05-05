import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Referencia a Post modellre
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatikusan az aktuális dátumot adja meg
    },
    comments: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
