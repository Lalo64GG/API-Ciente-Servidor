const express = require('express');
const routerLogin = express.Router();
const login = require('../Controllers/login.controller');

routerLogin.post('/', login.iniciarSesion);

module.exports = routerLogin;
