import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getRegions = (req, res) => {
    const regions = RegionsModel.getAllRegions();
    res.render(path.join(__dirname, '..', 'views', 'regions.ejs'), { regions });
}

const regionsController = { getRegions };

export default regionsController;