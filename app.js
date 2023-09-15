import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { MongoClient } from 'mongodb';

import regionsRouter from './routes/regions.js';
import locationRouter from './routes/location.js';
import amenitiesRouter from './routes/amenities.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);  

const app = express();
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'myDatabase';
const PORT = 3000;

let db;

app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

// app.use(regionsRouter);
// app.use(locationRouter);

MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    db = client.db(dbName);
    console.log('Connected to database');

    // Pass the db object to your routers
    app.use('/regions', regionsRouter(db));
    app.use('/location', locationRouter(db));
});

app.use(amenitiesRouter);

app.use((req, res) => {
    res.status(404);
    res.render(path.join(__dirname, 'views', '404.ejs'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
