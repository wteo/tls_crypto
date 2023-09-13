import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedAmenity = async (req, res) => {
    try {
        return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { 
            region: req.params.region, 
            location: req.params.location, 
            amenity: req.params.amenity
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const AmenitiesController = { getSelectedAmenity };

export default AmenitiesController;