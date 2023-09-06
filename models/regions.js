const data = [{
    state: 'NSW',
    region: 'Sydney',
    description: 'Sydney is Australia\'s largest and most iconic city, featuring world-renowned landmarks like the Sydney Opera House and Harbour Bridge. The city offers a vibrant lifestyle, bustling with various cultural events, outdoor activities, and a diverse culinary scene.',
    locations: [{
        location: 'Bondi',
        imageLink: 'https://wakeup.com.au/wp-content/themes/yootheme/cache/WAKEUP-BONDI-2019-8324-2-f40e129b.jpeg',
    }, {
        location: 'Manly',
        imageLink: 'https://media.cntraveler.com/photos/59516243365ba72b7a69c4e4/16:9/w_2560%2Cc_limit/GettyImages-500049291.jpg'
    }, {
        location: 'Parramatta',
        imageLink: 'https://static.ffx.io/images/$zoom_0.28266203703703696%2C$multiply_0.7554%2C$ratio_1.776846%2C$width_1059%2C$x_141%2C$y_163/t_crop_custom/q_86%2Cf_auto/ea1904a3bdea7d4fe38c68a7bf0a753e01a938bb'
    }, {
        location: 'Newtown',
        imageLink: 'https://assets.atdw-online.com.au/images/91cc11574e70957f58ddbd5c6b7b745c.jpeg?rect=0%2C2422%2C3707%2C2780&w=745&h=559&&q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI0NDU4ZDI3MDE1NGI0NTU0Njg2MyIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwYzgiLCJhcGlrZXlJZCI6IjU2YjFlZTU5MGNmMjEzYWQyMGRjNTgxOSJ9'
    }, {
        location: 'Surry Hills',
        imageLink: 'https://media.timeout.com/images/105684113/image.jpg'
    }, {
        location: 'Chatswood',
        imageLink: 'https://res.akamaized.net/domain/image/upload/t_web/v1624406710/Neighborhoods_Chatswood-6_unuaig.jpg',
    }, {
        location: 'Cronulla',
        imageLink: 'https://assets.atdw-online.com.au/images/c58721a43da3041a101f2d8ddbed3081.jpeg?rect=0%2C0%2C4000%2C3000&w=745&h=559&&q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjIzZWFkZDI3MDE1NGI0NTUzZmY3YyIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwYzgiLCJhcGlrZXlJZCI6IjU2YjFlZTU5MGNmMjEzYWQyMGRjNTgxOSJ9',
    }, {
        location: 'Coogee',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/%281%29Coogee_Beach_001.jpg/1200px-%281%29Coogee_Beach_001.jpg',
    }, {
        location: 'Darlinghurst',
        imageLink: 'https://goodmigrations.com/wp-content/themes/goodMigrationsV5/static/images/locations/sydney/neighborhoods/darlinghurst-banner.png'
    }, {
        location: 'Double Bay',
        imageLink: 'https://luxecityguides.com/wp-content/uploads/2021/03/01_Double_Bay_Szilard_Szasz_Toth.original.jpg'
    }, {
        location: 'Rose Bay',
        imageLink: 'https://res.akamaized.net/domain/image/upload/c_crop,h_727,w_1183,x_0,y_76/v1564305552/iStock-177016741_oainui.jpg'
    }, {
        location: 'Redfern',
        imageLink: 'https://static.ffx.io/images/$width_800%2C$height_450/t_crop_fill/q_86%2Cf_auto/54b3c838478e58fdb4f21feca71ad8dbe8e319d5'
    }]
}, {
    state: 'VIC',
    region: 'Melbourne',
    description: 'Melbourne is often dubbed as Australia\'s cultural capital, boasting an array of art galleries, live music venues, and theaters. The city is also famous for its intricate laneways filled with street art, boutique shops, and cozy cafes, making it a haven for foodies and art lovers alike.',
    locations: [{
        location: 'St Kilda',
        imageLink: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/189000/189417-Melbourne.jpg'
    }, {
        location: 'Fitzroy',
        imageLink: 'https://media.timeout.com/images/105407684/image.jpg'
    }, {
        location: 'South Yarra',
        imageLink: 'https://www.visitvictoria.com/-/media/atdw/melbourne/see-and-do/tours/5bdab5b62167e6465a5164ac375a3d8d_1600x1200.jpeg?ts=20221223401209'
    }, {
        location: 'Docklands',
        imageLink: 'https://www.visitvictoria.com/-/media/images/melbourne/travel-info/160141-3_docklands_canoes_1150x863.jpg?ts=20230215390553'
    }, {
        location: 'Carlton',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Rathdowne_st%2C_carlton_north.jpg'
    }, {
        location: 'Richmond',
        imageLink: 'https://goodmigrations.com/wp-content/themes/goodMigrationsV5/static/images/locations/melbourne/neighborhoods/richmond-banner.png'
    }, {
        location: 'South Melbourne',
        imageLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/South_Melbourne_Townhall.jpg/1200px-South_Melbourne_Townhall.jpg'
    }]
}, {
    state: 'QLD',
    region: 'Brisbane',
    description: 'Brisbane is a burgeoning city known for its youthful energy, scenic river views, and outdoor adventure opportunities. With its close proximity to tourist destinations like the Gold Coast and the Great Barrier Reef, it serves as an ideal starting point for exploring Queensland\'s natural wonders.',
    locations: [{
        location: 'South Bank',
        imageLink: 'https://www.mustdobrisbane.com/sites/default/files/styles/mdb_article_full/public/featured/streets-beach-oct-2019-2.jpg?itok=Px61C0_J'
    }, {
        location: 'Fortitude Valley',
        imageLink: 'https://assets.atdw-online.com.au/images/1d63bbebaa11c7255e9454c00345480b.jpeg?q=eyJ0eXBlIjoibGlzdGluZyIsImxpc3RpbmdJZCI6IjU2YjI1ZmUzYWVlZWFhZjc3M2NmMjg2ZiIsImRpc3RyaWJ1dG9ySWQiOiI1NmIxZWI5MzQ0ZmVjYTNkZjJlMzIwY2IiLCJhcGlrZXlJZCI6IjU2YjFlZmVlMGNmMjEzYWQyMGRkMjE3MCJ9&rect=127%2C0%2C2053%2C1540&w=600'
    }]
}]

class RegionsModel {
    constructor() {
        this.regions = data;
    }

    getAllStates() {
        const statesArray = this.regions.map(region => region.state);
        const statesSet = new Set(statesArray);
        const states = [...statesSet];
        return states;
    }

    getAllRegions() {
        return this.regions;
    }
}

export default new RegionsModel;