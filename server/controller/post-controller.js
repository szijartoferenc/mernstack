import Post from '../model/post.js';


/**
 * Új bejegyzés létrehozása
 */
export const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();

        res.status(201).json({ msg: 'Post saved successfully', post });
    } catch (error) {
        res.status(500).json({ msg: 'Error saving post', error: error.message });
    }
};


/**
 * Összes bejegyzés lekérése szűrési lehetőségekkel
 */
export const getAllPosts = async (req, res) => {
    try {
        const { username, category } = req.query;
        const filter = {};

        if (username) filter.username = username;
        if (category) filter.categories = category;

        const posts = await Post.find(filter);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: 'Error retrieving posts', error: error.message });
    }
};


/**
 * Egy bejegyzés lekérése ID alapján
 */
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: 'Error retrieving post', error: error.message });
    }
};

/**
 * Bejegyzés frissítése
 */
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({ msg: 'Post updated successfully', updatedPost });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating post', error: error.message });
    }
};

/**
 * Bejegyzés törlése
 */
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        await post.deleteOne();

        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting post', error: error.message });
    }
};