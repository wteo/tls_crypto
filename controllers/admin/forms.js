import path from 'path';
import { fileURLToPath } from 'url';
import LocationsModel from '../../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


const getAddRegionForm = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'add_region_form.ejs'));
}

const getUpdateRegionForm = (req, res) => {
    const { regions } = res.locals;
    const filteredRegion = regions.filter(region => region.region === req.params.region )
    const { state, region, description } = filteredRegion[0];
    return res.render(path.join(__dirname, '..', '..', 'views', 'update_region_form.ejs'), { state, region, description });
}

const getAddLocationForm = (req, res) => {
    const { states, regions } = res.locals;
    return res.render(path.join(__dirname, '..', '..', 'views', 'add_location_form.ejs'), { states, regions });
}

const getUpdateLocationForm = async(req, res) => {
    const { regions } = res.locals;
    const filteredRegion = regions.filter(region => region.region === req.params.region);
    const filteredLocation = filteredRegion[0].locations.filter(location => location.location === req.params.location);
    const locationData = await LocationsModel.getLocation(req.params.location);
    const { description, mapImageLink } = locationData;
    return res.render(path.join(__dirname, '..', '..', 'views', 'update_location_form.ejs'), { 
        region: req.params.region, 
        paramsLocation: req.params.location, 
        location: filteredLocation[0].location,
        locationImageLink: filteredLocation[0].imageLink,
        description, 
        mapImageLink
    });
};

const regionsController = { getAddRegionForm, getUpdateRegionForm, getAddLocationForm, getUpdateLocationForm };

export default regionsController;