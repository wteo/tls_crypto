import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedLocation = (req, res) => {
    const locations = LocationsModel.getAllLocations();
    const selectedRegion = req.params.region;
    const selectedLocation = req.params.location;
    locations.filter(location => location.location === selectedLocation);
    res.render(path.join(__dirname, '..', 'views', 'location.ejs'), { region: selectedRegion, location: locations[0].location });
}


const locationsController = { getSelectedLocation };

export default locationsController;