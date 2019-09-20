const mongoose = require('mongoose');
const User = mongoose.model('User');
const { Validator } = require('node-input-validator');

module.exports = {
  async register(req, res) {
    const validator = new Validator(req.body, {
      email: 'required|email',
      password: 'required',
      name: 'required'
    });
    const validation = await validator.check();
    if (!validation) {
      res.status(422).send(validator.errors);
    }

    try {
      const { email, name, password } = req.body;
      if (await User.findOne({ email })) {
        return res.status(400).json({
          error: 'User already exists'
        });
      }
      const user = await User.create({ email, name, password });
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({
        error: 'User registration failed'
      });
    }
  },

  async authenticate(req, res) {
    const validator = new Validator(req.body, {
      email: 'required|email',
      password: 'required'
    });
    const validation = await validator.check();
    if (!validation) {
      res.status(422).send(validator.errors);
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt
        },
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' });
    }
  },

  async me(req, res) {
    try {
      const { userId } = req;
      const user = await User.findById(userId);
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "Can't get user information" });
    }
  }
};
