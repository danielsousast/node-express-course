const express = require('express');
const routes = require('./routes');

// Setup da aplicação
const app = express();

// Middlewares de configuração
app.use(express.json());

// Rotas da aplciação
app.use(routes);

module.exports = app;