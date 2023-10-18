import path from 'path';
import { fileURLToPath } from 'url'; 
import Coins from '../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getSelectedCoin = async (req, res, next) => {
    try {
        const group = req.params.group;
        const coinData = await Coins.findOne({ coin: req.params.coin });

        if (coinData === null) {
            return res.render(path.join(__dirname, '..', 'views', '404.ejs'));
        } else {
            const { coin, description, imageLink, resources } = coinData;
            return res.render(path.join(__dirname, '..', 'views', 'coin.ejs'), { group, coin, description, imageLink, resources });
        }
    } catch (error) {
        next(error);
    }
}

const deleteResource = async (req, res, next) => {
    try {
        const { coin, resourceId } = req.body;
        await Coins.updateOne({ coin }, { $pull: { resources: { _id: resourceId }} });
        return res.redirect(`/${encodeURIComponent(req.params.group)}/${encodeURIComponent(coin)}/admin`);
    } catch (error) {
        next(error);
    }
}

const addResource = async (req, res, next) => {
    try {
        const { group, coin } = req.params;
        const { resource, imageLink, hyperlink } = req.body
        await Coins.updateOne({ coin }, { $push: { resources: { resource, imageLink, hyperlink } } });
        return res.redirect(`/${encodeURIComponent(group)}/${encodeURIComponent(coin)}/admin`);
    } catch (error) {
        next(error);
    }
}

const updateResource = async (req, res, next) => {
    try {
        const { group, coin } = req.params;
        const { resource, imageLink, hyperlink, resourceId } = req.body;
        await Coins.updateOne({ 
            coin,
            "resources._id": resourceId
        } , {
            $set: {
                "resources.$.resource": resource,
                "resources.$.imageLink": imageLink,
                "resources.$.hyperlink": hyperlink
            }
        });
        return res.redirect(`/${encodeURIComponent(group)}/${encodeURIComponent(coin)}/admin`);
    } catch (error) {
        next(error);
    }
}

const coinsController = { getSelectedCoin, deleteResource, addResource, updateResource };

export default coinsController;