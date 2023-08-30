const data = [{
    region: 'Sydney',
    locations: [{
        location: 'Bondi',
        imageLink: ''
    }, {
        location: 'Manly',
        imageLink: ''
    }, {
        location: 'Parramatta',
        imageLink: ''
    }, {
        location: 'Newtown',
        imageLink: ''
    }, {
        location: 'Surry Hills',
        imageLink: ''
    }, {
        location: 'Chatswood',
        imageLink: '',
    }, {
        location: 'Cronulla',
        imageLink: '',
    }, {
        location: 'Coogee',
        imageLink: '',
    }]
}, {
    region: 'Melbourne',
    locations: [{
        location: 'St Kilda',
        imageLink: ''
    }, {
        location: 'Fitzroy',
        imageLink: ''
    }, {
        location: 'South Yarra',
        imageLink: ''
    }, {
        location: 'Docklands',
        imageLink: ''
    }, {
        location: 'Carlton',
        imageLink: ''
    }]
}, {
    region: 'Brisbane',
    locations: [{
        location: 'South Bank',
        imageLink: ''
    }, {
        location: 'Fortitude Valley',
        imageLink: ''
    }, {
        location: 'West End',
        imageLink: ''
    }]
}]

class RegionsModel {
    constructor() {
        this.regions = data;
    }

    getAllRegions() {
        return this.regions;
    }
}

export default new RegionsModel;