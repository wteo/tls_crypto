import path from 'path';
import { fileURLToPath } from 'url';
import Coins from '../../models/coins.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const getAddGroupForm = (req, res) => {
    return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_group.ejs'));
}

const getUpdateGroupForm = (req, res) => {

    const { groups } = res.locals;
    const filteredGroup = groups.filter(group => group.group === req.params.group )
    const noGroupFound = filteredGroup.length === 0;

    if (noGroupFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        const { category, group, description } = filteredGroup[0];
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_group.ejs'), { category, group, description });
    }
}

const getAddCoinForm = (req, res) => {
    const { categories, groups } = res.locals;
    const noCategories = groups.length === 0;
    const noGroupFound = groups.length === 0;

    if (noCategories || noGroupFound) {
        return res.status(404).render(path.join(__dirname, '..', '..', 'views', '404.ejs'));
    } else {
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_coin.ejs'), 
            { 
                categories, 
                groups, 
                errorMessage: req.flash('error')[0],
                oldInput: req.session.oldInput || {} 
            });
    }
}

const getUpdateCoinForm = async(req, res, next) => {
    try {
        const { groups } = res.locals;
        const filteredGroup = groups.filter(group => group.group === req.params.group);
        const filteredCoin = filteredGroup[0].coins.filter(coin => coin.coin === req.params.coin);
        const coinData = await Coins.findOne({ coin: req.params.coin});
        const { description, imageLink } = coinData;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_coin.ejs'), { 
            group: req.params.group, 
            paramsCoin: req.params.coin, 
            coin: filteredCoin[0].coin,
            coinLogoLink: filteredCoin[0].coinLogoLink,
            description, 
            imageLink
        });
    } catch (error) {
        next(error)
    }
};

const getAddResourceForm = async (req, res, next) => {
    try {
        const { group, coin } = req.params;
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'add_resource.ejs'), { group, coin });
    } catch (error) {
        next(error);
    }
}

const getUpdateResourceForm = async (req, res, next) => {
    try {
        const coinData = await Coins.findOne({ coin: req.params.coin });
        const resource = coinData.resources.filter(resource => resource.resource === req.params.resource);
        return res.render(path.join(__dirname, '..', '..', 'views', 'admin', 'forms', 'update_resource.ejs'), 
            { 
                group: req.params.group, 
                coin: req.params.coin, 
                resource: resource[0].resource, 
                imageLink: resource[0].imageLink, 
                hyperlink: resource[0].hyperlink 
            });
    } catch (error) {
        next(error);
    }
}

const groupsController = { getAddGroupForm, getUpdateGroupForm, getAddCoinForm, getUpdateCoinForm, getAddResourceForm, getUpdateResourceForm };

export default groupsController;