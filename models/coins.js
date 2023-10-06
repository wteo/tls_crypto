import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    resource: String,
    imageLink: String,
    hyperlink: String
});


const CoinsSchema = new mongoose.Schema({
    coin: String,
    description: String,
    mapImageLink: String,
    resources: [ResourceSchema]
});

const Coins = mongoose.model('Coins', CoinsSchema);

export default Coins;