//  Import request from 'supertest' devdependency
const request = require('supertest');
//  Import Chai expect
const expect = require('chai').expect;
//  DB Connection
const knex = require('../db/knex');
//  Import express app from app.js
const app = require('../app');

describe('CRUD Developers', () => {
    //  Run before and other tests are defined
    before((done) => {
        //  Run migrations
        knex.migrate.latest()
            .then(() => {
                //  Run seeds
                return knex.seed.run();
            }).then(() => done());
    });

    //  Test for '/' route
    it('Lists all Developers', (done) => {
        request(app)
            .get('/api/v1/developers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                done();            
        });
    });

    //  Test for '/:id' route
    it('Lists all Developers by ID', (done) => {
        request(app)
            .get('/api/v1/developers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                done();            
        });
    });

});