import { getDB } from '../utils/database.js';

class RegionsModel {
    constructor(state, region, description) {
        this.state = state;
        this.region = region;
        this.description = description;
    }

    get collection() {
        return getDB().collection('regions');
    }

    async addRegion() {
        const { state, region, description } = this;
        return this.collection.insertOne({ state, region, description, locations: [] });
    }

    async updateRegion(paramsRegion) {
        const { state, region, description } = this;
        return await this.collection.updateOne({ region: paramsRegion }, { $set: { state, region, description } });
    }

    async deleteRegion(region) {
        return await this.collection.deleteOne({ region });
    };

    async addLocationToArray(region, location, imageLink) {
        return await this.collection.updateOne({ region }, { $push: { locations: { location, imageLink } } });
    }

    
    async updateLocationInArray(region, paramsLocation, location, locationImageLink) {
        return await this.collection.updateOne(
            { 
                region,
                "locations.location": paramsLocation
            },
            {
                $set: {
                    "locations.$.location": location,
                    "locations.$.imageLink": locationImageLink,
                }
            }
        );
    }

    deleteLocationFromArray(selectedLocation) {
        return this.collection.updateOne({ 'locations.location': selectedLocation }, { $pull: { locations: { location: selectedLocation }} });
    }
}

export default RegionsModel;

