import path from 'path';
import { fileURLToPath } from 'url'; 
import RegionsModel from '../models/regions.js';
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const addRegion = async (req, res) => {
    const { state, region, description } = req.body;
    await new RegionsModel(state, region, description).addRegion();
    return res.redirect(`/${region}/admin`);
}

const updateRegion = async (req, res) => {
    const { state, region, description } = req.body;
    await new RegionsModel(state, region, description).updateRegion(req.params.region);
    return res.redirect(`/admin`);
}

const deleteRegion = async (req, res) => {
    await new RegionsModel().deleteRegion(req.body.region);
    return res.redirect('/admin');
}

const addLocation = async (req, res) => {
    const { region, location, locationImageLink, description, mapImageLink } = req.body
    await new RegionsModel().addLocation(region, location, locationImageLink);
    await new LocationsModel(location, description, mapImageLink).addLocationPage();
    return res.redirect(`/${region}/admin`);
}

const updateLocation = async (req, res) => {
    const { location, locationImageLink, description, mapImageLink } = req.body;
    await new RegionsModel().updateLocation(req.params.region, req.params.location, location, locationImageLink); 
    await new LocationsModel(location, description, mapImageLink).updateLocation(req.params.location);
    return res.redirect(`/${req.params.region}/${req.body.location}/admin`);
};

const deleteLocation = async (req, res) => {
    const { region, location } = req.body;
    await new RegionsModel().deleteLocation(location);
    await LocationsModel.deleteLocationPage(location);
    return res.redirect(`/${region}/admin`);
}

const regionsController = { addRegion, updateRegion, deleteRegion, addLocation, updateLocation, deleteLocation };

export default regionsController;