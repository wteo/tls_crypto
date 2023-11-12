import path from 'path';
import { fileURLToPath } from 'url'; 

import GlobalGroupsModel from '../models/global_groups.js';
import Groups from '../models/groups.js';
import FAQItems from '../models/FAQ_items.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const globalGroupsModel = new GlobalGroupsModel();

const getCategories = async (req, res, next) => {
    try {
        res.locals.encode = encodeURIComponent;
        res.locals.categories = await Groups.distinct('category');
        res.locals.groups = await globalGroupsModel.getGroupsWithSortedCoins();
        res.locals.faqItems = await FAQItems.find({ category: 'hub' });
        next();
    } catch (error) {
        next(error);
    }
}

const getGroups = (req, res) => {
    const { groups, faqItems } = res.locals;
    return res.render(path.join(__dirname, '..', 'views', 'groups.ejs'), { groups, faqItems });
}

const fetchSearchResults = async (req, res, next) => {
    try {
        const query = req.query.coin;
        res.locals.results = await globalGroupsModel.searchByCoin(query);
        return res.render(path.join(__dirname, '..', 'views', 'results.ejs'));
    } catch (error) {
        next(error);
    }
}

const globalGroupsController = { getCategories, getGroups, fetchSearchResults };

export default globalGroupsController;