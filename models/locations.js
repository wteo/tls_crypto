export default class LocationsModel {
    constructor(db) {
        this.db = db;
        this.collection = this.db.collection('locations');
    }

    async getLocation(region, location) {
        try {
            return await this.collection.findOne({ region, location });
        } catch (error) {
            console.error('Error getting location:', error);
            return null;
        }
    }
}