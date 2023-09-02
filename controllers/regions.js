import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getRegions = (req, res) => {
    const regions = RegionsModel.getAllRegions();
    res.render(path.join(__dirname, '..', 'views', 'regions.ejs'), { regions });
}

const getSelectedRegion = (req, res) => {
    const regions = RegionsModel.getAllRegions();
    const filteredRegions = regions.filter(region => region.region === req.params.region);

    const noRegionFound = filteredRegions.length === 0;

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        const { region, description, locations } = filteredRegions[0];
        return res.render(path.join(__dirname, '..', 'views', 'region.ejs'), { region, description, locations });
    }
}

const regionsController = { getRegions, getSelectedRegion };

export default regionsController;