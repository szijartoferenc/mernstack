import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://user:asdfghjkl@blog-app.kts7f.mongodb.net/?retryWrites=true&w=majority';

const url = 'http://localhost:8000';  // A szerver címe
// Kapcsolódás
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'photos' });
});

export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${url}/uploads/${req.file.filename}`;  // Helyes fájlútvonal
    res.status(200).json({ imageUrl });
};

export const getImage = async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
