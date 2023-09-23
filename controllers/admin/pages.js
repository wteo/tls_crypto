import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


const getMainPage = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'regions_admin.ejs'));
}

const getRegionPage = (req, res) => {
    const { regions } = res.locals
    const filteredRegions = regions.filter(region => region.region === req.params.region);
    const noRegionFound = filteredRegions.length === 0

    if (noRegionFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        const { region, description, locations } = filteredRegions[0];
        return res.status(500).render(path.join(__dirname, '..', '..', 'views', 'region_admin.ejs'), { region, description, locations });
    }
};

const regionsController = { getMainPage, getRegionPage };

export default regionsController;