import { getDB } from '../utils/database.js';

class LocationsModel {
    constructor(location, description, mapImageLink, amenities) {
        this.location = location;
        this.description = description;
        this.mapImageLink = mapImageLink;
        this.amenities = amenities;
    }

    getLocation(location) {
        const db = getDB();
        return db.collection('locations').findOne({ location });
    }
}

export default LocationsModel;