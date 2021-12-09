const route = require('express').Router();

const {
  verifyAccount,
  verifyIfCpfAlreadyExists,
} = require('../middlewares/verifyAccount');
const { create } = require('../controllers/accountController');

route.post(
  '/account/register',
  verifyAccount,
  verifyIfCpfAlreadyExists,
  create,
);

module.exports = route;
