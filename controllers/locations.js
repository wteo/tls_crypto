import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = async (req, res, next) => {
    try {
        const region = req.params.region;
        const locationData = await LocationsModel.getLocation(req.params.location);
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        next(error);
    }
}

const getAdminPage = async (req, res, next) => {
    try {
        const region = req.params.region;
        const locationData = await LocationsModel.getLocation(req.params.location);
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'admin', 'pages', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        next(error);
    }
};

const deleteAmenity = async (req, res, next) => {
    try {
        const { location, amenity } = req.body;
        await new LocationsModel().deleteAmenity(location, amenity);
        return res.redirect(`/${req.params.region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const getAddAmenityForm = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        return res.render(path.join(__dirname, '..', 'views', 'admin', 'forms', 'add_amenity.ejs'), { region, location });
    } catch (error) {
        next(error);
    }
}

const addAmenity = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        const { amenity, imageLink, hyperlink } = req.body
        await new LocationsModel().addAmenity(location, amenity, imageLink, hyperlink);
        return res.redirect(`/${region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const getUpdateAmenityForm = async (req, res, next) => {
    try {
        const locationData = await LocationsModel.getLocation(req.params.location);
        const amenity = locationData.amenities.filter(amenity => amenity.amenity === req.params.amenity);
        return res.render(path.join(__dirname, '..', 'views', 'admin', 'forms', 'update_amenity.ejs'), 
            { 
                region: req.params.region, 
                location: req.params.location, 
                amenity: amenity[0].amenity, 
                imageLink: amenity[0].imageLink, 
                hyperlink: amenity[0].hyperlink 
            });
    } catch (error) {
        next(error);
    }
}

const updateAmenity = async (req, res, next) => {
    try {
        const { region, location } = req.params;
        const { amenity, imageLink, hyperlink } = req.body;
        await new LocationsModel().updateAmenity(location, req.params.amenity, amenity, imageLink, hyperlink); 
        return res.redirect(`/${region}/${location}/admin`);
    } catch (error) {
        next(error);
    }
}

const locationsController = { getSelectedLocation, getAdminPage, deleteAmenity, getAddAmenityForm, addAmenity, getUpdateAmenityForm, updateAmenity };

export default locationsController;