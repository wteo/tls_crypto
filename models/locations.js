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

    async addAmenity(location, amenity, imageLink, hyperlink) {
        const db = getDB();
        return await db.collection('locations').updateOne({ location }, { $push: { amenities: { amenity, imageLink, hyperlink } } });
    }

    static getAmenity(location, amenity) {
        const db = getDB();
        return db.collection('locations').findOne({ location });
    }

}

export default LocationsModel;