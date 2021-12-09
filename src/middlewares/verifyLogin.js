const { verifyLoginFields } = require('../schemas/account');

const verifyLogin = (req, res, next) => {
  const { error } = verifyLoginFields.validate(req.body);

  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  verifyLogin,
};
