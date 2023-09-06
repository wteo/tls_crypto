const data = [{
    location: 'Bondi',
    description: 'Located just 7 kilometers from Sydney\'s CBD, Bondi is a coastal suburb best known for its iconic Bondi Beach. This area offers a relaxed, beachside lifestyle complete with trendy cafes, boutique shops, and a variety of dining options. With excellent schools and public transport links, Bondi is a top choice for families and young professionals seeking both convenience and a high quality of life.                             Beyond its famous beach, Bondi is a vibrant community that hosts year-round events like Sculpture by the Sea and Bondi Winter Magic. The local real estate market is diverse, featuring everything from historic Art Deco apartments to modern luxury homes. With its mix of natural beauty and urban amenities, Bondi stands out as one of Sydney\'s most desirable suburbs for prospective homebuyers.',
    mapImageLink: 'https://www.google.com/maps/vt/data=ebAcbYblrVhVrmfWcAa-Do5ubQOTXxYe4NbFCdWRlwNR0DzBpekHPkQms2ekhRq_ezG7bKn8ff3fU04A1aqLG5ARVYvJjLiJ0jOSAWUlYuT1hYf0twaKRkei0CX9cqsgS4oUTVQRtd772BlVtefXwwOc3X9V93_SQnJG7vwOh1e8FtBSRTyDALlhdn7oOKw6ebgIJbWcZFTOpnPPQf6veDuWwfGxfthRcX1Odr1jbhJKt0n6upakMhI',
    amenities: [{
            amenity: 'Education',
            imageLink: 'https://assets.weforum.org/global_future_council/image/W43md-ZlCf6Ljlf_7_0dCuSsNZ3BfPc9fwCLnNxFTSo.jpg',
            hyperlink: '__________',
        }, {
            amenity: 'Food & Dining',
            imageLink: 'https://www.macquariecentre.com.au/getmedia/611ebf83-8695-43ad-b78d-ca87902f9b74/L_Restaurant_Shared_Lunch_1.jpg?width=8510&height=5674&ext=.jpg',
        }, {
            amenity: 'Recreation',
            imageLink: 'https://www.nrpa.org/uploadedImages/wwwparksandrecreationorg/Articles/2016/April/Social-equity.jpg',
        }, {
            amenity: 'Shopping',
            imageLink: 'https://www.visitchatswood.com.au/files/assets/chatswood/v/1/generic-images/chatswood-chase1.jpg?w=1080',
        }, {
            amenity: 'Transportation',
            imageLink: 'https://assets.primecreative.com.au/imagegen/cr/340/255/s3/cougar-assets/abcau/2016/10/14/131712/Untitled-1.jpg',
        }, {
            amenity: 'Safety',
            imageLink: 'https://static.wixstatic.com/media/285f80_78a3d7d19da8413b8f2ca675a3ebb2d8~mv2.jpg/v1/fill/w_560,h_228,al_t,q_80,usm_0.66_1.00_0.01,enc_auto/285f80_78a3d7d19da8413b8f2ca675a3ebb2d8~mv2.jpg',
        }, {
            amenity: 'Culture',
            imageLink: 'https://surfculture.com.au/cdn/shop/collections/Surf-Culture-Bondi-Road_41601388-0bf4-43ef-a445-e5b15992ef18.jpg?v=1625840925',
        }]
    }, {
        location: 'St Kilda',
        description: '',
        mapImageLink: 'https://www.google.com/maps/vt/data=ebAcbYblrVhVrmfWcAa-Do5ubQOTXxYe4NbFCdWRlwNR0DzBpekHPkQms2ekhRq_ezG7bKn8ff3fU04A1aqLG5ARVYvJjLiJ0jOSAWUlYuT1hYf0twaKRkei0CX9cqsgS4oUTVQRtd772BlVtefXwwOc3X9V93_SQnJG7vwOh1e8FtBSRTyDALlhdn7oOKw6ebgIJbWcZFTOpnPPQf6veDuWwfGxfthRcX1Odr1jbhJKt0n6upakMhI',
        amenities: [{
                amenity: 'Education',
                imageLink: 'https://assets.weforum.org/global_future_council/image/W43md-ZlCf6Ljlf_7_0dCuSsNZ3BfPc9fwCLnNxFTSo.jpg',
                hyperlink: '__________',
            }, {
                amenity: 'Food & Dining',
                imageLink: 'https://www.macquariecentre.com.au/getmedia/611ebf83-8695-43ad-b78d-ca87902f9b74/L_Restaurant_Shared_Lunch_1.jpg?width=8510&height=5674&ext=.jpg',
            }, {
                amenity: 'Recreation',
                imageLink: 'https://www.nrpa.org/uploadedImages/wwwparksandrecreationorg/Articles/2016/April/Social-equity.jpg',
            }, {
                amenity: 'Shopping',
                imageLink: 'https://www.visitchatswood.com.au/files/assets/chatswood/v/1/generic-images/chatswood-chase1.jpg?w=1080',
            }], 
}];

class LocationsModel {
    constructor() {
        this.locations = data;
    }

    getAllLocations() {
        return this.locations;
    }
}

export default new LocationsModel;