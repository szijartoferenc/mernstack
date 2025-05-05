import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb+srv://user:asdfghjkl@blog-app.kts7f.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to database:', error);
    }
};

export default Connection;