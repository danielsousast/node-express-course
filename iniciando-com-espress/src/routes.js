const {Router} = require('express');
const {uuid} = require('uuidv4');

const routes = new Router();

// Array de produtos
const products = [];


// Lista todos os produtos
routes.get('/products', (req, res) => {
    return res.json(products);
});

// Cria um novo produto
routes.post('/products', (req, res) => {
    const {name, description, price, category} = req.body;

    const product = {
        id:uuid(),
        name, 
        description, 
        price, 
        category
    }

    products.push(product);

    return res.json(product);
});

// Altera um produto
routes.put('/products/:id', (req, res) => {
    const {id} = req.params;
    const {name, description, price, category} = req.body;

    const productIndex = products.findIndex(product => 
        product.id === id
    );

    if (productIndex === -1) {
        return res.status(400).json({ error: 'Product does not exists' });
    }

    const product = {
        id:uuid(),
        name, 
        description, 
        price, 
        category
    }

    products[productIndex] = product;

    return res.json(product);
});

// Deleta um produto
routes.delete('/products/:id', (req, res) => {
    const {id} = req.params;

    const productIndex = products.findIndex(product => 
        product.id === id
    );

    if (productIndex === -1) {
        return res.status(400).json({ error: 'Product does not exists' });
    }

    products.splice(productIndex, 1);

    return res.status(204).send();
});

module.exports = routes;