const service = require('../services/accountService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    await service.createAccount(req.body);
    res.status(201).json({ message: `Thank you for registering ${name}` });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await service.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  create,
  login,
};
