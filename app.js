import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 

import regionsRouter from './routes/regions.js';
import locationRouter from './routes/location.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);  

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use(regionsRouter);

app.use(locationRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
