const { MongoClient } = require('mongodb');

const OPTIONS = {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'localhost'}:27017/`;

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
    db = conn.db('bank_accounts');
    return db;
  }));

module.exports = connection;
