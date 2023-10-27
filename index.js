// Import necessary modules and libraries
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { mongoConnect } from './utils/database.js';
import { MongoDBStore } from './utils/store.js';
import CSRFProtection from './middlewares/csrf_protection.js';
import flash from 'connect-flash';
import helmet from 'helmet'

// Import route handlers
import FAQItemsRouter from './routes/FAQ_items.js';
import globalGroupsRouter from './routes/global_groups.js';
import authRouter from './routes/auth.js';
import adminPagesRouter from './routes/admin/pages.js';
import adminFormsRouter from './routes/admin/forms.js';
import groupsRouter from './routes/groups.js';
import coinsRouter from './routes/coins.js';

// Define constants for directory paths
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);  

// Initialize the Express application
const app = express();
const PORT = 8000;

// Set up the view engine as EJS
app.set('view engine', 'ejs'); 

// Define static files directory and URL encoding settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

// Set up session management with MongoDB as the store
app.use(session({
    secret: 'My Secret Key',
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore,
    cookie: {
        maxAge: 3600000 // 1 hour session before user is automatically logged out 
    }
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Apply CSRF protection middleware
app.use(CSRFProtection.generateCSRFToken);
app.use(flash());

// Define routes for the application
// REST API
app.use('/api/', FAQItemsRouter);

// Server-side UI
app.use(globalGroupsRouter);
app.use(authRouter);
app.use(adminFormsRouter);
app.use(adminPagesRouter);
app.use(groupsRouter);
app.use(coinsRouter);

// Error handling for internal server errors
app.use((err, req, res) => {
    console.error(err.message);
    return res.status(500).render(path.join(__dirname, 'views', '500.ejs'));
});

// Error handling for 404 - Not Found
app.use((req, res) => {
    res.status(404);
    return res.render(path.join(__dirname, 'views', '404.ejs'));
});

// Connect to MongoDB and start the application server
mongoConnect(() => {
    app.listen(PORT);
});



