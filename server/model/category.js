import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ne legyenek duplikált kategóriák
        trim: true // Levágja az extra whitespace-eket
    }
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
