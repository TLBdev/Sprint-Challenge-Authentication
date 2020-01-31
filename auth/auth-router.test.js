
const request = require('supertest')
const server = require('../api/server')
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../auth/config')

describe('test register', function () {
    it('works', function () {
        return request(server).post('/api/auth/register')
            .send({
                username: 'bob',
                password: 'dole'
            })
            .then(res => {
                expect(res.status).toBe(201);

            })

    })
    it('works', function () {
        return request(server).post('/api/auth/register')
            .send({
                username: 'basagy',
                password: 'dole'
            })
            .then(res => {

                expect(res.req.method).toBe('POST')
            })

    })
})
let token = ''
describe('test login', function () {
    it('works', function () {
        return request(server).post('/api/auth/login')
            .send({
                username: 'basagy',
                password: 'dole'
            })
            .then(res => {
                token = JSON.parse(res.text).token
                expect(res.status).toBe(200)

            })
    })
    it('works', function () {
        let isValid = false
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (!err) {
                isValid = true
            }
        })
        expect(isValid).toBe(true)
    })
})
