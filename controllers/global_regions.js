import path from 'path';
import { fileURLToPath } from 'url'; 
import GlobalRegionsModel from '../models/global_regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getStates = async (req, res, next) => {
    try {
        res.locals.states = await new GlobalRegionsModel().getAllStates();
        res.locals.regions = await new GlobalRegionsModel().getRegionsWithSortedLocations();
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
}

const getRegions = (req, res) => {
    const { regions } = res.locals;
    return res.render(path.join(__dirname, '..', 'views', 'regions.ejs'), { regions });
}

const getSelectedRegion = (req, res) => {
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

const fetchSearchResults = async (req, res) => {
    try {
        const query = req.query.location;
        res.locals.results = await new GlobalRegionsModel().searchByLocation(query);
        return res.render(path.join(__dirname, '..', 'views', 'results.ejs'));
    } catch (error) {
        console.error(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
}

const globalRegionsController = { getStates, getRegions, getSelectedRegion, fetchSearchResults };

export default globalRegionsController;