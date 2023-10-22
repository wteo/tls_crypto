import FAQItems from '../models/FAQ_items.js';

const getFAQItems = async (req, res, next) => {
    try {
        const items = await FAQItems.find({});
        return res.status(200).json({
            message: 'Success',
            data: {
                items
            }
        });
    } catch (error) {
        next(error);
    }

}

const FAQItemsController = { getFAQItems };

export default FAQItemsController;


