/*
 Router to handle products routes. Must set products data model before use.

 productsRouter.products references the data model for the products.
 */
const express = require('express')

const productsRouter = express.Router()
module.exports = productsRouter;

/*
 Validate product id.
 */
productsRouter.param('id', (req, res, next, id) => {
    productsRouter.products.find(id, (err, product) => {
        if (err) {
            next (err)
        } else if (product) {
            req.product = product
            next()
        } else {
            const err = new Error('failed to find productId')
            err.status = 500
            next(err)
        }
    })
})

/*
 GET all products.
 */
productsRouter.get('/', (req, res, next) => {
    productsRouter.products.getAll((err, products) => {
        if (err) {
            next (err)
        } else if (products) {
            res.send(products)
        } else {
            const err = new Error('Could not laod products')
            err.status = 500
            next(err)
        }
    })
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
productsRouter.post('/', (req, res, next) => {
    const receivedProduct = req.body
    productsRouter.products.create(receivedProduct, (err, product) => {
        if (err) {
            next(err)
        } else if (product) {
            res.send(product)
        } else {
            const err = new Error('Could not create new product')
            err.status = 401
            next(err)
        }
    })
})

/*
 PUT an updated product.
 */
productsRouter.put('/:id', (req, res, next) => {
    const receivedProduct = req.body
    let oldProduct = req.product
    Object.assign(oldProduct, receivedProduct)
    productsRouter.products.update(req.params.id, oldProduct, (err, product) => {
        res.send(product);
    })
})

/*
 DELETE a product.
 */
productsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    productsRouter.products.delete(id, (err, product) => {
        res.sendStatus(204)
    })
})
