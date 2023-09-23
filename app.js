import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 

import globalRegionRouter from './routes/global_regions.js';
import adminPagesRouter from './routes/admin/pages.js';
import adminFormsRouter from './routes/admin/forms.js';
// import regionsRouter from './routes/regions.js';
// import locationRouter from './routes/location.js';
// import amenitiesRouter from './routes/amenities.js';
 import { mongoConnect } from './utils/database.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);  

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use(globalRegionRouter);
app.use(adminPagesRouter);
app.use(adminFormsRouter);
// app.use(regionsRouter);
// app.use(locationRouter);
// app.use(amenitiesRouter);


app.use((req, res) => {
    res.status(404);
    res.render(path.join(__dirname, 'views', '404.ejs'));
});


mongoConnect(() => {
    app.listen(PORT);
});


