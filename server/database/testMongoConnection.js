import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://user:asdfghjkl@blog-app.kts7f.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0); // Sikeres csatlakozás után kilépés
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Hibás kapcsolat esetén kilépés
    });
