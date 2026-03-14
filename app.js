require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');

const productRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "NodeJS DynamoDB CRUD API",
        instance: os.hostname()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});