import { getDB } from '../utils/database.js';
import RegionsModel from './regions.js';

class GlobalRegionsModel extends RegionsModel {
    constructor() {
        super();
    }

    getAllStates() {
        return this.collection.distinct('state');
    }

    getAllRegions() {
        return this.collection.find().toArray();
    }

    async getRegionsWithSortedLocations() {
        const regions = await this.getAllRegions();
        regions.forEach(region => {
            if (region.locations) {
                region.locations.sort((a, b) => a.location.localeCompare(b.location));
            }
        });
        return regions;
    }

    async searchByLocation(searchLocation) {
        const results = await this.collection.aggregate([
            { $unwind: '$locations' },
            { $match: { 'locations.location': { $regex: new RegExp(searchLocation, 'i') } } },
            { $project: { region: 1, 'locations.location': 1, 'locations.imageLink': 1 } }
        ]).toArray();
        return results.map(item => ({
            region: item.region,
            location: item.locations.location,
            imageLink: item.locations.imageLink
        }));
    }
}

export default GlobalRegionsModel;