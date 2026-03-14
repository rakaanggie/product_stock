const express = require('express');
const router = express.Router();
const dynamodb = require('../dynamodb');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const TABLE = process.env.DYNAMODB_TABLE;

const allowedCategories = [
    "clothes",
    "shoes",
    "jewelery",
    "skincare",
    "haircare"
];


// CREATE PRODUCT

router.post('/', async (req, res) => {

    const { name, category, stock } = req.body;

    if (!allowedCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
    }

    const product = {
        productId: uuidv4(),
        name,
        category,
        stock
    };

    const params = {
        TableName: TABLE,
        Item: product
    };

    try {

        await dynamodb.put(params).promise();

        res.json(product);

    } catch (err) {

        res.status(500).json(err);

    }

});


// GET ALL PRODUCTS

router.get('/', async (req, res) => {

    const params = {
        TableName: TABLE
    };

    try {

        const data = await dynamodb.scan(params).promise();

        res.json(data.Items);

    } catch (err) {

        res.status(500).json(err);

    }

});


// GET PRODUCT BY ID

router.get('/:id', async (req, res) => {

    const params = {
        TableName: TABLE,
        Key: {
            productId: req.params.id
        }
    };

    try {

        const data = await dynamodb.get(params).promise();

        res.json(data.Item);

    } catch (err) {

        res.status(500).json(err);

    }

});


// UPDATE PRODUCT

router.put('/:id', async (req, res) => {

    const { name, category, stock } = req.body;

    const params = {
        TableName: TABLE,
        Key: { productId: req.params.id },
        UpdateExpression: "set #n = :name, category = :category, stock = :stock",
        ExpressionAttributeNames: {
            "#n": "name"
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":category": category,
            ":stock": stock
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {

        const data = await dynamodb.update(params).promise();

        res.json(data);

    } catch (err) {

        res.status(500).json(err);

    }

});


// DELETE PRODUCT

router.delete('/:id', async (req, res) => {

    const params = {
        TableName: TABLE,
        Key: {
            productId: req.params.id
        }
    };

    try {

        await dynamodb.delete(params).promise();

        res.json({ message: "Product deleted" });

    } catch (err) {

        res.status(500).json(err);

    }

});

module.exports = router;