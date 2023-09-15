class RegionsModel {
    constructor(db) {
        this.db = db;
        this.collection = this.db.collection('regions');
    }

    async getAllStates() {
        const states = await this.collection.distinct('state');
        return states;
    }

    async getAllRegions() {
        const regions = await this.collection.find().toArray();
        return regions;
    }

    async getAllRegionsByAlphabeticalOrder() {
        const regions = await this.collection.find().toArray();
        regions.forEach(region => {
            region.locations.sort((a, b) => a.location.localeCompare(b.location));
        });
        return regions;
    }

    async filterData(searchLocation) {
        const results = await this.collection.aggregate([
            { $unwind: "$locations" },
            { $match: { "locations.location": { $regex: new RegExp(searchLocation, "i") } } },
            { $project: { region: 1, "locations.location": 1, "locations.imageLink": 1 } }
        ]).toArray();
        return results.map(item => ({
            region: item.region,
            location: item.locations.location,
            imageLink: item.locations.imageLink
        }));
    }
}

export default RegionsModel;
