import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getRegisterForm = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'register.ejs'));
}

const postRegisterForm = async (req, res, next) => {
    try {

        const user = await Users.findOne({ username: req.body.username });
        const { username, password, confirmedPassword } = req.body;

        if (!user) {
            if (password !== confirmedPassword) {
                console.log('Passwords do not match');
                return res.redirect('/register');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await Users.create({ username, password: hashedPassword });
            console.log('New User created!');
            return res.redirect('/login');
        } else {
            console.log('This username is already registered. Please login.');
            return res.redirect('/register');
        }

    } catch(error) {
        next(error);
    }
}

const getLoginForm = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'login.ejs'));
}


const postLoginForm = async (req, res, next) => {
    
    try {
        const user = await Users.findOne({ username: req.body.username });
        console.log(user);

        if (user === null) {
            console.log('No username exists.');
            return res.redirect('/login');
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(error => error ? next(error) : res.redirect(`/admin`));
        } else {
            console.log('Invalid password!');
            return res.redirect('/login');
        }   

    } catch (error) {
        next(error);
    }
}

const postLogout = (req, res, next) => {
    console.log('You are now logged out!');
   return req.session.destroy(error => error ? next(error) : res.redirect('/'));
}

const usersController = { getRegisterForm, postRegisterForm, getLoginForm, postLoginForm, postLogout };

export default usersController;