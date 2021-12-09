const connection = require('./connection');

const findByCpf = (cpf) => connection()
  .then((db) => db.collection('accounts').findOne({ cpf }))
  .catch((error) => error);

const createAccount = (name, cpf, password) => connection()
  .then((db) => db.collection('accounts').insertOne({
    name, cpf, password, amount: 0,
  }))
  .catch((error) => error);

module.exports = {
  createAccount,
  findByCpf,
};
