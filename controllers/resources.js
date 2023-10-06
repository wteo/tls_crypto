import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedResource = (req, res) => {
    return res.render(path.join(__dirname, '..', 'views', 'article.ejs'), { group: req.params.group, coin: req.params.coin, resource: req.params.resource });
}


const ResourcesController = { getSelectedResource };

export default ResourcesController;