const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, userData } = await authService.login(email, password);
    res.json({ token, userData });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
