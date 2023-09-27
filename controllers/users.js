import path from 'path';
import { fileURLToPath } from 'url'; 
// import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getLoginForm = (req, res) => {
    console.log('Are you logged in?');
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'login.ejs'), { username: 'username', password: 'password' });
}

const postLoginForm = (req, res, next) => {
    req.session.isLoggedIn = true;
    console.log(req.url.toLowerCase().includes('admin'));
    console.log(req.session);
    res.redirect(`/admin`);
}


const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        next();
    } else {
        res.redirect('/login');
    }
}

const usersController = { getLoginForm, postLoginForm, checkAuth };

export default usersController;