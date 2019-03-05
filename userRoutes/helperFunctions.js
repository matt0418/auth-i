const knex = require('knex')
const knexConfg = require('../knexfile')

const db = knex(knexConfg.development)

module.exports = {
    add,
    find,
    findBy,
    findById
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function find() {
    return db('users').select('id', 'username', 'password')
}

function findBy(filterparam) {
    return db('users').where(filterparam)
}

function findById(id) {
    return db('users').where({ id }).first()
}