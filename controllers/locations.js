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
        return res.render(path.join(__dirname, '..', 'views', 'location_admin.ejs'), { region, location, description, mapImageLink, amenities });
    } catch (error) {
        console.log(error);
        return res.status(500).render(path.join(__dirname, '..', 'views', '500.ejs'));
    }
};

const locationsController = { getSelectedLocation, getAdminPage };

export default locationsController;