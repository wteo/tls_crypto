import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const url = process.env.MongoDBURI;

export const mongoConnect = (callback) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected!');
        callback();
    })
    .catch(err => {
        console.log(err);
        throw new Error('Connection error');
    });
};

