import path from 'path';
import { fileURLToPath } from 'url'; 
import Groups from '../models/groups.js';
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const fetchGroup = async(req, res, next) => {
    try {
        const groupData = await Groups.findOne({ group: req.params.group });
    
        if (!groupData) {
          return res.status(404).render(path.join(__dirname, '..', 'views', '404.ejs'));
        } else {
          return res.render(path.join(__dirname, '..', 'views', 'group.ejs'), { 
            group: groupData.group, 
            description: groupData.description, 
            coins: groupData.coins 
          });
        }
    } catch (error) {
        next(error);
    }
}

const addGroup = async (req, res, next) => {
    try {
        const { category, group, description } = req.body;
        await Groups.create({ category, group, description });
        return res.redirect(`/${group}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateGroup = async (req, res, next) => {
    try {
        const { category, group, description } = req.body;
        const query = { group: req.params.group };
        await Groups.updateOne (query, { category, group, description });
        return res.redirect(`/admin`);
    } catch (error) {
        next(error);
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        await Groups.deleteOne({ group: req.body.group });
        return res.redirect('/admin');
    } catch (error) {
        next(error);
    }
}

const addCoin = async (req, res, next) => {
    try {
        const { group, coin, coinImageLink, description, mapImageLink } = req.body
        await Groups.updateOne({ group }, { $push: { coins: { coin, imageLink: coinImageLink } } });
        await Coins.create({ coin, description, mapImageLink, resources: [] });
        return res.redirect(`/${group}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateCoin = async (req, res, next) => {
    try {
        const { coin, coinImageLink, description, mapImageLink } = req.body;
        const conditions = { group: req.params.group, 'coins.coin': req.params.coin };
        const update = {
            $set: {
                'coins.$.coin': coin,
                'coins.$.imageLink': coinImageLink
            }
        };
        await Groups.updateOne(conditions, update);
        await Coins.updateOne({ coin: req.params.coin }, { coin, description, mapImageLink})
        return res.redirect(`/${req.params.group}/${req.body.coin}/admin`);
    } catch (error) {
        next(error);
    }
};

const deleteCoin = async (req, res, next) => {
    try {
        const { group, coin } = req.body;
        const conditions = { 'coins.coin': coin };
        const update = { $pull: { coins: { coin }} };
        await Groups.updateOne (conditions, update);
        await Coins.deleteOne({ coin });
        return res.redirect(`/${group}/admin`);
    } catch (error) {
        next(error);
    }
}

const groupsController = { fetchGroup, addGroup, updateGroup, deleteGroup, addCoin, updateCoin, deleteCoin };

export default groupsController;