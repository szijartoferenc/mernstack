import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';



import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://mernstack-coral-nu.vercel.app',
  'https://mernstack-ashen-one.vercel.app'
  'https://mernstack-szijartoferencs-projects.vercel.app/',
  'https://mernstack-git-main-szijartoferencs-projects.vercel.app/'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', Router);
app.use('/uploads', express.static('uploads'));  // Publikussá teszi az uploads mappát

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


Connection(USERNAME, PASSWORD);


