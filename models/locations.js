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

    static deleteLocationPage(selectedLocation) {
        const db = getDB();
        return db.collection('locations').deleteOne({ location: selectedLocation });
    }

    async addLocationPage() {
        const { location, description, mapImageLink } = this;
        const db = getDB();
        return await db.collection('locations').insertOne({ location, description, mapImageLink, amenities: [] });
    }

    async updateLocation(paramsLocation) {
        const { location, description, mapImageLink } = this;
        const db = getDB();
        return await db.collection('locations').updateOne(
            { 
                location: paramsLocation 
            }, { 
                $set: {
                    location,
                    description, 
                    mapImageLink 
                }
            });
    }

    deleteAmenityfromArray(location, selectedAmenity) {
        const db = getDB();
        return db.collection('locations').updateOne({ location }, { $pull: { amenities: { amenity: selectedAmenity }} });
    }

    async addAmenityToArray(location, amenity, imageLink, hyperlink) {
        const db = getDB();
        return await db.collection('locations').updateOne({ location }, { $push: { amenities: { amenity, imageLink, hyperlink } } });
    }

    async updateAmenityInArray(location, paramsAmenity, amenity, imageLink, hyperlink) {
        const db = getDB();
        return await db.collection('locations').updateOne(
            { 
                location,
                "amenities.amenity": paramsAmenity
            },
            {
                $set: {
                    "amenities.$.amenity": amenity,
                    "amenities.$.imageLink": imageLink,
                    "amenities.$.hyperlink": hyperlink
                }
            }
        );
    }

}

export default LocationsModel;