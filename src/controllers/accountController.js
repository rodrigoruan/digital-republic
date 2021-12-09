const service = require('../services/accountService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await service.createAccount(req.body);
    res.status(201).json({ name, token: response });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = {
  create,
};
