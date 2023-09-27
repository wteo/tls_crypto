import path from 'path';
import { fileURLToPath } from 'url'; 
// import Users from '../models/users.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getLoginForm = (req, res) => {
    console.log('Are you logged in?');
    return res.render(path.join(__dirname, '..', 'views', 'auth', 'login.ejs'), { username: 'username', password: 'password' });
}

const postLoginForm = (req, res) => {
    return res.redirect(`/admin`);
}

const usersController = { getLoginForm, postLoginForm };

export default usersController;