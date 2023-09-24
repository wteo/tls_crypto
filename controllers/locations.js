import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = async (req, res) => {
    try {
        const region = req.params.region;
        const locationData = await LocationsModel.getLocation(req.params.location);
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        console.log(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
}

const getAdminPage = async (req, res) => {
    try {
        const region = req.params.region;
        const locationData = await LocationsModel.getLocation(req.params.location);
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'admin', 'pages', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        console.log(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
};

const deleteAmenity = async (req, res) => {
    const { location, amenity } = req.body;
    await new LocationsModel().deleteAmenity(location, amenity);
    return res.redirect(`/${req.params.region}/${location}/admin`);
}

const getAddAmenityForm = async (req, res) => {
    const { region, location } = req.params;
    return res.render(path.join(__dirname, '..', 'views', 'admin', 'forms', 'add_amenity.ejs'), { region, location });
}

const addAmenity = async (req, res) => {
    const { region, location } = req.params;
    const { amenity, imageLink, hyperlink } = req.body
    await new LocationsModel().addAmenity(location, amenity, imageLink, hyperlink);
    return res.redirect(`/${region}/${location}/admin`);
}

const getUpdateAmenityForm = async (req, res) => {
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
}

const updateAmenity = async (req, res) => {
    const { region, location } = req.params;
    const { amenity, imageLink, hyperlink } = req.body;
    await new LocationsModel().updateAmenity(location, req.params.amenity, amenity, imageLink, hyperlink); 
    return res.redirect(`/${region}/${location}/admin`);
}

const locationsController = { getSelectedLocation, getAdminPage, deleteAmenity, getAddAmenityForm, addAmenity, getUpdateAmenityForm, updateAmenity };

export default locationsController;