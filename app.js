const express = require('express')

const app = express()
const PORT = 4001

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})

app.get('/', (req, res, next) => {
    res.send('Hello, World!\n');
})
