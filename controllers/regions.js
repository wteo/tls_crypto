import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const regionsController = (db) => {
    const regionsModel = new RegionsModel(db);

    const getStates = async(req, res, next) => {
        try {
            res.locals.states = await regionsModel.getAllStates();
            res.locals.regions = await regionsModel.getAllRegionsByAlphabeticalOrder();
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    const getSearchResults = async(req, res) => {
        const query = req.query.location;
        res.locals.results = await regionsModel.filterData(query);
        return res.render(path.join(__dirname, '..', 'views', 'results.ejs'));
    }
    
    const getRegions = async(req, res) => {
        const { regions } = res.locals;
        res.render(path.join(__dirname, '..', 'views', 'regions.ejs'), { regions });
    }
    
    const getSelectedRegion = async(req, res) => {
        const { regions } = res.locals;
        const filteredRegions = regions.filter(region => region.region === req.params.region);
    
        const noRegionFound = filteredRegions.length === 0;
    
        if (noRegionFound) {
            return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
        } else {
            const { region, description, locations } = filteredRegions[0];
            return res.render(path.join(__dirname, '..', 'views', 'region.ejs'), { region, description, locations });
        }
    }

    return { getStates, getSearchResults, getRegions, getSelectedRegion };
}


export default regionsController;