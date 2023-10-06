import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    resource: String,
    imageLink: String,
    hyperlink: String
});


const CryptocurrencySchema = new mongoose.Schema({
    cryptocurrency: String,
    description: String,
    mapImageLink: String,
    resources: [ResourceSchema]
});

const Cryptocurrencies = mongoose.model('Cryptocurrencies', CryptocurrencySchema);

export default Cryptocurrencies;