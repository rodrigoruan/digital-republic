const route = require('express').Router();

const {
  verifyAccount,
  verifyIfCpfAlreadyExists,
} = require('../middlewares/verifyAccount');

const { verifyLogin } = require('../middlewares/verifyLogin');

const { create, login } = require('../controllers/accountController');

route.post(
  '/account/register',
  verifyAccount,
  verifyIfCpfAlreadyExists,
  create,
);

route.post('/account/login', verifyLogin, login);

module.exports = route;
