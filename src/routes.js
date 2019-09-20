const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');

// open routes
routes.get('/', (req, res) => {
  return res.send('API is working!');
});
routes.post('/register', UserController.register);
routes.post('/authenticate', UserController.authenticate);

// auth routes
routes.use(authMiddleware);
routes.get('/me', UserController.me);

module.exports = routes;
