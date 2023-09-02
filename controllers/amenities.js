import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedAmenity = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { region: req.params.region, location: req.params.location, amenity: req.params.amenity });
}


const AmenitiesController = { getSelectedAmenity };

export default AmenitiesController;