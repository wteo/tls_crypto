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
            coins: groupData.coins.sort() 
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
        return res.redirect(`/${encodeURIComponent(group)}/admin`);
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

        const { group, coin, coinLogoLink, description, imageLink } = req.body
        const coinCheck = await Coins.findOne({ coin }) === null;

        if (coinCheck) {
            await Groups.updateOne({ group }, { $push: { coins: { coin, coinLogoLink } } });
            await Coins.create({ coin, description, imageLink, resources: [] });
            req.session.oldInput = {};
            return res.redirect(`/${encodeURIComponent(group)}/admin`);
        } else {
            req.flash('error', 'This coin already exists in our database. Please update the existing coin or choose a different name.');
            req.session.oldInput = { group, coin, coinLogoLink, description, imageLink };
            return req.session.save(error => error ? next(error) : res.redirect('/admin/add-coin-form'));
        }
    } catch (error) {
        next(error);
    }
}

const updateCoin = async (req, res, next) => {
    try {
        const { coin, coinLogoLink, description, imageLink } = req.body;
        const conditions = { group: req.params.group, 'coins.coin': req.params.coin };
        const update = {
            $set: {
                'coins.$.coin': coin,
                'coins.$.coinLogoLink': coinLogoLink
            }
        };

        const coinData = await Coins.findOne({ coin });

        if (coinData === null || coinData.coin === req.params.coin ) {
            await Groups.updateOne(conditions, update);
            await Coins.updateOne({ coin: req.params.coin }, { coin, description, imageLink})
            return res.redirect(`/${req.params.group}/${encodeURIComponent(req.body.coin)}/admin`);
        } else {
            req.flash('error', 'This coin already exists in our database. Please update the existing coin or choose a different name.');
            return req.session.save(error => error ? next(error) : res.redirect(`/${encodeURIComponent(req.params.group)}/${encodeURIComponent(req.params.coin)}/admin/update-coin-form`)); 
        }

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
        return res.redirect(`/${encodeURIComponent(group)}/admin`);
    } catch (error) {
        next(error);
    }
}

const groupsController = { fetchGroup, addGroup, updateGroup, deleteGroup, addCoin, updateCoin, deleteCoin };

export default groupsController;