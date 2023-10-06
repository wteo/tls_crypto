import path from 'path';
import { fileURLToPath } from 'url'; 
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedCoin = async (req, res, next) => {
    try {
        const group = req.params.group;
        const coinData = await Coins.findOne({ coin: req.params.coin });
        const { coin, description, mapImageLink, resources } = coinData;
        return res.render(path.join(__dirname, '..', 'views', 'coin.ejs'), { group, coin, description, mapImageLink, resources });
    } catch (error) {
        next(error);
    }
}

const deleteResource = async (req, res, next) => {
    try {
        const { coin, resource } = req.body;
        await Coins.updateOne({ coin }, { $pull: { resources: { resource }} });
        return res.redirect(`/${req.params.group}/${coin}/admin`);
    } catch (error) {
        next(error);
    }
}

const addResource = async (req, res, next) => {
    try {
        const { group, coin } = req.params;
        const { resource, imageLink, hyperlink } = req.body
        await Coins.updateOne({ coin }, { $push: { resources: { resource, imageLink, hyperlink } } });
        return res.redirect(`/${group}/${coin}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateResource = async (req, res, next) => {
    try {
        const { group, coin } = req.params;
        const { resource, imageLink, hyperlink } = req.body;
        await Coins.updateOne({ 
            coin,
            "resources.resource": req.params.resource
        } , {
            $set: {
                "resources.$.resource": resource,
                "resources.$.imageLink": imageLink,
                "resources.$.hyperlink": hyperlink
            }
        });
        return res.redirect(`/${group}/${coin}/admin`);
    } catch (error) {
        next(error);
    }
}

const coinsController = { getSelectedCoins, deleteResource, addResource, updateResource };

export default coinsController;