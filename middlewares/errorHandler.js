import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.error(err);

    res.status(err.statusCode).render(path.join(__dirname, '..', 'views', 'error.ejs'), {
        message: err.message,
        status: err.status
    });
};

export default globalErrorHandler;
