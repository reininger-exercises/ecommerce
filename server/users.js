const { query } = require('express')
const express = require('express')
const usersModel = require('../db/users')

const usersRouter = express.Router()
module.exports = usersRouter

usersRouter.param('id', async (req, res, next, id) => {
    try {
        const user = await usersModel.find(id)
        if (user) {
            req.user = user
            next()
        } else {
            const err = new Error('user id not found')
            err.status = 404
            next(err)
        }
    } catch(err) {
        err.status = 500
        next(err)
    }
})

usersRouter.get('/', async (req, res, next) => {
    try {
        res.send(await usersModel.getAll())
    } catch(err) {
        err.status = 500
        next(err)
    }
})

usersRouter.get('/:id', (req, res, next) => {
    res.send(req.user)
})

usersRouter.post('/', async (req, res, next) => {
    const user = req.body
    try {
        const createdUser = await usersModel.create(user)
        res.send(createdUser)
    } catch(err) {
        err.status = 500
        next(err)
    }
})

usersRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedUser = await usersModel.delete(id)
        res.send(204)
    } catch(err) {
        err.status = 500
        next(err)
    }
})

/*
 PUT an updated user.
 */
usersRouter.put('/:id', async (req, res, next) => {
    const updates = req.body
    let user = req.user
    Object.assign(user, updates)
    try {
        const updatedUser = await usersModel.update(user)
        res.send(updatedUser)
    } catch(err) {
        err.status = 500
        throw(err)
    }
})
