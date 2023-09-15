import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
let _db;

export const mongoConnect = (callback) => {
    MongoClient.connect(url)
    .then(client => {
        console.log('Connected!');
        _db = client.db('realestates');
        callback();
    })
    .catch(err => {
        console.log(err);
        throw new Error('Connection error');
    });
}

export const getDB = () => {
    if(_db) {
        return _db;
    }
    throw new Error('No database found!');
}

