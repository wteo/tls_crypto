import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedAmenity = (req, res) => {

    const { region, location, amenity } = req.params;
    try {
        return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { region, location, amenity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const AmenitiesController = { getSelectedAmenity };

export default AmenitiesController;