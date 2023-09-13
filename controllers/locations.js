import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = (db) => async (req, res) => {

    const locationsModel = new LocationsModel(db);

    const region = req.params.region;
    const locationData = await locationsModel.getLocation(region, req.params.location);

    if (locationData) {
        const { location, description, mapImageLink, amenities } = locationData;
        return res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region, location, description, mapImageLink, amenities });
    } else {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    }
}

const locationsController = { getSelectedLocation };

export default locationsController;