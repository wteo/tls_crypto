import path from 'path';
import { fileURLToPath } from 'url'; 
import LocationsModel from '../models/locations.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedAmenity = (req, res) => {

    const locations = LocationsModel.getAllLocations();
    const filteredLocations = locations.filter(location => location.location === req.params.location);
    const filteredAmenities = filteredLocations[0].amenities.filter(amenity => amenity.amenity === req.params.amenity); 
    const noAmenityFound = filteredAmenities.length === 0;

    if (noAmenityFound) {
        return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
    } else {
        return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { region: req.params.region, location: req.params.location, amenity: filteredAmenities[0] });
    }
}


const AmenitiesController = { getSelectedAmenity };

export default AmenitiesController;