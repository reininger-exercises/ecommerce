/*
 Router to handle products routes. Must set products data model before use.

 productsRouter.products references the data model for the products.
 */
const express = require('express');
const productsModel = require('../db/products')

const productsRouter = express.Router()
module.exports = productsRouter;

/*
 Validate product id.
 */
productsRouter.param('id', async (req, res, next, id) => {
    try {
        const product = await productsModel.find(id)
        if (product) {
            req.product = product
            next()
        } else {
            const err = new Error('product id not found')
            err.status = 404
            next(err)
        }
    } catch(err) {
        err.status = 500
        next(err)
    }
})

/*
 GET all products.
 */
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await productsModel.getAll()
        if (products) {
            res.send(products)
        } else {
            const err = new Error('unknown server error')
            throw(err)
        }
    } catch(err) {
        err.status = 500
        next(err)
    }
})

/*
 GET a product by id.
 */
productsRouter.get('/:id', (req, res, next) => {
    const product = req.product
    res.send(product)
})

/*
 POST a new product.
 */
productsRouter.post('/', async (req, res, next) => {
    const product = req.body
    if (!product.name) {
        const err = new Error('cannot create product without name')
        err.status = 404
        next(err)
    } else {
        try {
            const createdProduct = await productsModel.create(product)
            res.send(createdProduct)
        } catch(err) {
            err.status = 500
            next(err)
        }
    }
})

/*
 PUT an updated product.
 */
productsRouter.put('/:id', async (req, res, next) => {
    const updates = req.body
    let product = req.product
    Object.assign(product, updates)
    try {
        const updatedProduct = await productsModel.update(product)
        res.send(updatedProduct)
    } catch(err) {
        err.status = 500
        throw(err)
    }
})

/*
 DELETE a product.
 */
productsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const product = await productsModel.delete(id)
        res.send(product)
    } catch(err) {
        err.status = 500
        next(err)
    }
})
