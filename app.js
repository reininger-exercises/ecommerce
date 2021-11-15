const express = require('express')
const productsRouter = require('./products')
productsRouter.products = require('./MockProducts')

const app = express()
const PORT = 4001

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})

app.use(express.json())

app.use('/products', productsRouter)

app.get('/', (req, res, next) => {
    res.send('Hello, World!\n');
})
