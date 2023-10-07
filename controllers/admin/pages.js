import path from 'path';
import { fileURLToPath } from 'url'; 
import Coins from '../../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


const getMainPage = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'groups.ejs'));
}

const getGroupPage = (req, res) => {
    const { groups } = res.locals
    const filteredGroups = groups.filter(group => group.group === req.params.group);
    const noGroupFound = filteredGroups.length === 0

    if (noGroupFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        const { group, description, coins } = filteredGroups[0];
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'group.ejs'), { group, description, coins });
    }
};

const getCoinPage = async (req, res, next) => {
    try {
        const group = req.params.group;
        const coinData = await Coins.findOne({ coin: req.params.coin });
        const { coin, description, imageLink, resources } = coinData;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'pages', 'coin.ejs'), { group, coin, description, imageLink, resources });
    } catch (error) {
        next(error);
    }
};

const groupsController = { getMainPage, getGroupPage, getCoinPage };

export default groupsController;