import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import { config } from 'dotenv';

config();

const Store = connectMongoDBSession(session);

const mongoDBURI = process.env.MongoDBURI

export const MongoDBStore = new Store({
  uri: mongoDBURI,
  collection: 'sessions',
  autoRemove: 'interval',
  autoRemoveInterval: 10
});
