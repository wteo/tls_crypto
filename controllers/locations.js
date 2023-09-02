import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = (req, res) => {

    const region = req.params.region;
    const locations = LocationsModel.getAllLocations();
    const filteredLocations = locations.filter(location => location.location === req.params.location);
    const noLocationFound = filteredLocations.length === 0;

    if (noLocationFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        const { location, mapImageLink, amenities }  = filteredLocations[0];
        return res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region, location, mapImageLink, amenities });
    }
}


const locationsController = { getSelectedLocation };

export default locationsController;