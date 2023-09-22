import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getStates = async (req, res, next) => {
    try {
        res.locals.states = await new RegionsModel().getAllStates();
        res.locals.regions = await new RegionsModel().getAllRegionsByAlphabeticalOrder();
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
}

const getAdminMainPage = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'regions_admin.ejs'));
}

const getRegionForm = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'region_form.ejs'));
}

const addRegion = async (req, res) => {
    const { state, region, description } = req.body;
    await new RegionsModel().addRegion(state, region, description);
    return res.redirect(`/${region}/admin`);
}

const getAdminRegionPage = (req, res) => {
    const { regions } = res.locals
    const filteredRegions = regions.filter(region => region.region === req.params.region);
    const noRegionFound = filteredRegions.length === 0

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        const { region, description, locations } = filteredRegions[0];
        return res.status(500).render(path.join(__dirname, '..', 'views', 'region_admin.ejs'), { region, description, locations });
    }
};

const deleteLocation = async (req, res) => {
    const { region, location } = req.body;
    await new RegionsModel().deleteLocation(location);
    await RegionsModel.deleteLocationPage(location);
    return res.redirect(`/${region}/admin`);
}

const getAddLocationForm = (req, res) => {
    const { states, regions } = res.locals;
    return res.render(path.join(__dirname, '..', 'views', 'add_location_form.ejs'), { states, regions });
}

const addLocation = async (req, res) => {
    const { region, location, locationImageLink, description, mapImageLink } = req.body
    await new RegionsModel().addLocation(region, location, locationImageLink);
    await RegionsModel.addLocationPage(location, description, mapImageLink);
    return res.redirect(`/${region}/admin`);
}

const getUpdateLocationForm = async(req, res) => {
    const { regions } = res.locals;
    const filteredRegion = regions.filter(region => region.region === req.params.region);
    const filteredLocation = filteredRegion[0].locations.filter(location => location.location === req.params.location);
    const locationData = await LocationsModel.getLocation(req.params.location);
    const { description, mapImageLink } = locationData;
    return res.render(path.join(__dirname, '..', 'views', 'update_location_form.ejs'), { 
        region: req.params.region, 
        paramsLocation: req.params.location, 
        location: filteredLocation[0].location,
        locationImageLink: filteredLocation[0].imageLink,
        description, 
        mapImageLink
    });
};

const updateLocation = async (req, res) => {
    const { location, locationImageLink, description, mapImageLink } = req.body;
    await new RegionsModel().updateLocation(req.params.region, req.params.location, location, locationImageLink, description, mapImageLink); 
    return res.redirect(`/${req.params.region}/${req.body.location}/admin`);
};

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

const regionsController = { getStates, getAdminMainPage, getRegionForm, addRegion, getAdminRegionPage, deleteLocation, addLocation, getAddLocationForm, getUpdateLocationForm, updateLocation, getSearchResults, getRegions, getSelectedRegion };

export default regionsController;