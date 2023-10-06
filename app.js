import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import { mongoConnect } from './utils/database.js';
import { MongoDBStore } from './utils/store.js';
import CSRFProtection from './middlewares/csrf_protection.js';
import flash from 'connect-flash';

import globalGroupsRouter from './routes/global_groups.js';

import authRouter from './routes/auth.js';
import adminPagesRouter from './routes/admin/pages.js';
import adminFormsRouter from './routes/admin/forms.js';
import groupsRouter from './routes/groups.js';

import Router from './routes/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);  

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'My Secret Key',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore,
    cookie: {
        maxAge: 600000 
    }
}));

app.use(CSRFProtection.generateCSRFToken);
app.use(flash());

app.use(globalGroupsRouter);
app.use(authRouter);
app.use(adminFormsRouter);
app.use(adminPagesRouter);
app.use(groupsRouter);
app.use(Router);

// This is a catch-all error for any internal server errors
app.use((err, req, res) => {
    console.error(err.message);
    return res.status(500).render(path.join(__dirname, 'views', '500.ejs'));
});

app.use((req, res) => {
    res.status(404);
    return res.render(path.join(__dirname, 'views', '404.ejs'));
});


mongoConnect(() => {
    app.listen(PORT);
});


