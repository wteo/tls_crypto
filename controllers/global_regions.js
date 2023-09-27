import path from 'path';
import { fileURLToPath } from 'url'; 

import GlobalRegionsModel from '../models/global_regions.js';
import Regions from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const globalRegionsModel = new GlobalRegionsModel();

const getStates = async (req, res, next) => {
    try {
        res.locals.states = await Regions.distinct('state');
        res.locals.regions = await globalRegionsModel.getRegionsWithSortedLocations();
        next();
    } catch (error) {
        next(error);
    }
}

const getRegions = (req, res) => {
    const { regions } = res.locals;
    const noRegionFound = regions.length === 0;

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        return res.render(path.join(__dirname, '..', 'views', 'regions.ejs'), { regions });
    }
}

const fetchSearchResults = async (req, res, next) => {
    try {
        const query = req.query.location;
        res.locals.results = await globalRegionsModel.searchByLocation(query);
        return res.render(path.join(__dirname, '..', 'views', 'results.ejs'));
    } catch (error) {
        next(error);
    }
}

const globalRegionsController = { getStates, getRegions, fetchSearchResults };

export default globalRegionsController;