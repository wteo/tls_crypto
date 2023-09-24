import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedAmenity = (req, res) => {
    const { region, location, amenity } = req.params;
    return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { region, location, amenity });
};

const AmenitiesController = { getSelectedAmenity };

export default AmenitiesController;