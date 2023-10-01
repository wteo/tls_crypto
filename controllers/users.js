import path from 'path';
import { fileURLToPath } from 'url'; 
import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getLoginForm = (req, res) => {
    console.log('Are you logged in?')
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'login.ejs'));
}


const postLoginForm = async (req, res, next) => {
    
    try {
        const user = await Users.findOne({ username: req.body.username });
        console.log(user);

        if (user === null) {
            console.log('No username exists.');
        }

        const isPasswordCorrect = user.password === req.body.password;
        
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(error => error ? next(error) : res.redirect(`/admin`));
        } else {
            console.log('Invalid password!');
        }   

    } catch (error) {
        next(error);
    }
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