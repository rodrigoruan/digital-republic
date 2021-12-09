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
  const passwordHashed = await hashPassword(password);
  await model.createAccount(name, cpf, passwordHashed);
};

const verifyUser = async (cpf) => {
  const user = await model.findByCpf(cpf);

  if (!user) {
    throw Error('Account doesn\'t exists');
  }

  return user;
};

const verifyPassword = async (password, hashedPassword) => {
  const correctPassword = await bcrypt.compare(password, hashedPassword);

  if (!correctPassword) {
    throw Error('Incorrect password');
  }

  return correctPassword;
};

const login = async ({ cpf, password }) => {
  const user = await verifyUser(cpf);
  await verifyPassword(password, user.password);

  const token = jwt.sign({ cpf }, SECRET_KEY);
  return token;
};

module.exports = {
  createAccount,
  createToken,
  login,
};
