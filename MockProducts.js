const { create } = require("domain");

/*
 Mock products data model.
 */
const MockProducts = {
    idCounter: 4,

    /*
     Error first callback. Passes product to callback if found, undefined
     otherwise.
     */
    find(id, callback) {
        const product = products.find(product => product.id == id)
        callback(undefined, product)
    },

    /*
     Error first callback. Passes list of all products to callback.
     */
    getAll(callback) {
        callback(undefined, products)
    },

    /*
     Add new product to model.
     */
    create(product, callback) {
        const id = this.idCounter++
        product.id = id
        products.push(product)
        callback(undefined, product)
    },

    /*
     Update a product.
     */
    update(id, product, callback) {
        const oldProduct = products.find(product => product.id == id)
        Object.assign(oldProduct, product)
        callback(undefined, oldProduct)
    },

    /*
     DELETE a product.
    */
    delete(id, callback) {
        const productIndex = products.findIndex(product => product.id == id)
        const product = products[productIndex]
        products.splice(productIndex, 1)
        callback(undefined, product)
    }
}

const products = [
    {
        id: 1,
        name: "Skis",
        price: 799.99,
        description: "Alpine snow skis."
    },

    {
        id: 2,
        name: "Mittens",
        price: 149.99,
        description: "Leather mittens to keep your hands warm on a cold winter day."
    },

    {
        id: 3,
        name: "Helmet",
        price: 299.99,
        description: "Keep your noggin safe."
    }
]

module.exports = MockProducts;
