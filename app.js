const express = require('express')
const productsRouter = require('./server/products')
const usersRouter = require('./server/users')

const app = express()
const PORT = 4001

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})

app.use(express.json())

app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.get('/', (req, res, next) => {
    res.send('Hello, World!\n');
})

app.use((err, req, res, next) => {
    res.status(err.status)
    res.send(err.status + ': ' + err)
})