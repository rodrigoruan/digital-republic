const { verifyAccountFields } = require('../schemas/account');
const { findByCpf } = require('../models/accountModel');

const verifyAccount = (req, res, next) => {
  const { error } = verifyAccountFields.validate(req.body);

  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }

  next();
};

const verifyIfCpfAlreadyExists = async (req, res, next) => {
  const { cpf } = req.body;

  const userAlreadyExists = await findByCpf(cpf);

  if (userAlreadyExists) {
    return res.status(401).json({ message: 'Account already exists' });
  }

  next();
};

module.exports = {
  verifyAccount,
  verifyIfCpfAlreadyExists,
};
