import Groups from './groups.js';

class GlobalGroupsModel {
    constructor() {}

    async getGroupsWithSortedCoins() {
        const groups = await Groups.find().sort({ group: 1 }); // Sort groups alphabetically
        groups.forEach(group => {
            if (group.coins) {
                group.coins.sort((a, b) => a.coin.localeCompare(b.coin));
            }
        });
        return groups;
    }

    async searchByCoin(searchCoin) {
        const results = await Groups.aggregate([
            { $unwind: '$coins' },
            { $match: { 'coins.coin': { $regex: new RegExp(searchCoin, 'i') } } },
            { $sort: { 'coins.coin': 1 } }, 
            { $project: { group: 1, 'coins.coin': 1, 'coins.coinLogoLink': 1 } }
        ]);
        return results.map(item => ({
            group: item.group,
            coin: item.coins.coin,
            imageLink: item.coins.coinLogoLink
        }));
    }
}

export default GlobalGroupsModel;
