import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getStates = async (req, res, next) => {
    try {
        res.locals.states = await new RegionsModel().getAllStates();
        res.locals.regions = await new RegionsModel().getAllRegionsByAlphabeticalOrder();
        next();
    } catch (error) {
        console.error(error);
        res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
}

const getAdminPage = (req, res) => {
    const { regions } = res.locals
    const filteredRegions = regions.filter(region => region.region === req.params.region);
    const noRegionFound = filteredRegions.length === 0

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        const { region, description, locations } = filteredRegions[0];
        return res.status(500).render(path.join(__dirname, '..', 'views', 'admin.ejs'), { region, description, locations });
    }
};

const deleteLocation = async (req, res) => {
    const { region, location } = req.body;
    await new RegionsModel().deleteLocation(location);
    return res.redirect(`/${region}/admin`);
}

const getSearchResults = async (req, res) => {
    try {
        const query = req.query.location;
        res.locals.results = await new RegionsModel().filterData(query);
        return res.render(path.join(__dirname, '..', 'views', 'results.ejs'));
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

const regionsController = { getStates, getAdminPage, deleteLocation, getSearchResults, getRegions, getSelectedRegion };

export default regionsController;