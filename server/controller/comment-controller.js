import Comment from '../model/comment.js';

// Új komment létrehozása
export const newComment = async (request, response) => {
    try {
        const comment = new Comment(request.body);
        await comment.save(); // Aszinkron mentés

        response.status(201).json({ message: 'Comment saved successfully', comment });
    } catch (error) {
        response.status(500).json({ message: 'Error saving comment', error });
    }
}

// Kommentek lekérése egy post-hoz
export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        if (!comments.length) {
            return response.status(404).json({ message: 'No comments found for this post' });
        }
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching comments', error });
    }
}

// Komment törlése
export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ message: 'Comment not found' });
        }

        await comment.deleteOne(); // Törlés aszinkron

        response.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: 'Error deleting comment', error });
    }
}
