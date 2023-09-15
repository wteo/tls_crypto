class LocationsModel {
    constructor(db) {
        this.db = db;
        this.collection = this.db.collection('locations');
    }

    async getLocation(region, location) {
        return await this.collection.findOne({ region, location });
    }
}

export default LocationsModel;