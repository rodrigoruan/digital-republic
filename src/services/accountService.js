const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const model = require('../models/accountModel');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createToken = async (name, cpf) => {
  const token = jwt.sign({ name, cpf }, SECRET_KEY);
  return token;
};

const createAccount = async ({ name, cpf, password }) => {
  const passwordHashed = hashPassword(password);
  await model.createAccount(name, cpf, passwordHashed);
  const token = createToken(name, cpf);
  return token;
};

module.exports = {
  createAccount,
  createToken,
};
