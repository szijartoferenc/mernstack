import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
// MongoDB URI
const mongoURI = 'mongodb+srv://user:asdfghjkl@blog-app.kts7f.mongodb.net/?retryWrites=true&w=majority';

// Kapcsolódás az adatbázishoz
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'photos' });
});

// Ellenőrizzük, hogy létezik-e az uploads mappa, ha nem, akkor létrehozzuk
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;