import { getDB } from '../utils/database.js';

class LocationsModel {
    constructor(location, description, mapImageLink, amenities) {
        this.location = location;
        this.description = description;
        this.mapImageLink = mapImageLink;
        this.amenities = amenities;
    }

    static getLocation(location) {
        const db = getDB();
        return db.collection('locations').findOne({ location });
    }

    deleteAmenity(location, selectedAmenity) {
        const db = getDB();
        return db.collection('locations').updateOne({ location }, { $pull: { amenities: { amenity: selectedAmenity }} });
    }
}

export default LocationsModel;