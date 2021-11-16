/*
 Data model for interacting with users.
 */

const { query } = require('./index')

const usersModel = {
    async create({ email, first_name, last_name}) {
        if (!email || !first_name || !last_name) {
            const err = new Error('email, first_name, last_name required')
            err.status = 404
            throw(err)
        }
        const text = `
            INSERT INTO users (email, first_name, last_name)
            VALUES ($1, $2, $3)
            RETURNING *;
        `
        console.log(text)
        const params = [email, first_name, last_name]
        try {
            const res = await query(text, params)
            return res.rows[0]
        } catch(err) {
            err.status = 500
            throw(err)
        }
    },

    async getAll() {
        const text = `
            SELECT *
            FROM users
        `
        const res = await query(text)
        return res.rows
    },
    
    async find(id) {
        const text = `
            SELECT *
            FROM users
            WHERE id = $1
        `
        const params = [id]
        const res = await query(text, params)
        return res.rows[0]
    },

    async delete(id) {
        const text = `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `
        const params = [id]
        const res = await query(text, params)
        return res.rows[0]
    },

    async update({ id, first_name, last_name, email }) {
        const text = `
            UPDATE users
            SET first_name = $1,
                last_name = $2,
                email = $3
            WHERE id = $4
            RETURNING *
        `
        const params = [first_name, last_name, email, id]
        const res = await query(text, params)
        return res.rows[0]
    }
}

module.exports = usersModel
