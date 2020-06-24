const app = require('./app');

// Expõe uma porta para o servidor
app.listen(3333, () => 
    console.log('Server running on port 3333')
);