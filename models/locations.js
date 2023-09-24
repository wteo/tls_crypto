import { getDB } from '../utils/database.js';

class LocationsModel {
    constructor(location, description, mapImageLink, amenities) {
        this.location = location;
        this.description = description;
        this.mapImageLink = mapImageLink;
        this.amenities = amenities;
    }

    get collection() {
        return getDB().collection('locations');
    }

    async getLocation(location) {
        return await this.collection.findOne({ location });
    }

    async deleteLocationPage(selectedLocation) {
        return await this.collection.deleteOne({ location: selectedLocation });
    }

    async addLocationPage() {
        const { location, description, mapImageLink } = this;
        return await this.collection.insertOne({ location, description, mapImageLink, amenities: [] });
    }

    async updateLocation(paramsLocation) {
        const { location, description, mapImageLink } = this;
        return await this.collection.updateOne(
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

    async deleteAmenityfromArray(location, selectedAmenity) {
        return await this.collection.updateOne({ location }, { $pull: { amenities: { amenity: selectedAmenity }} });
    }

    async addAmenityToArray(location, amenity, imageLink, hyperlink) {
        return await this.collection.updateOne({ location }, { $push: { amenities: { amenity, imageLink, hyperlink } } });
    }

    async updateAmenityInArray(location, paramsAmenity, amenity, imageLink, hyperlink) {
        return await this.collection.updateOne(
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