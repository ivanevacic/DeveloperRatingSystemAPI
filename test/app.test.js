//  Import request from 'supertest' devdependency
const request = require('supertest');
//  Import Chai expect
const expect = require('chai').expect;
//  DB Connection
const knex = require('../db/knex');
//  Import express app from app.js
const app = require('../app');

//  Testing data
const fixtures = require('./fixtures');

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
                expect(response.body).to.deep.equal(fixtures.developers);                       
        });
        done();
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
                expect(response.body).to.deep.equal(fixtures.developers[0]);                           
        });
        done();
    });

    //  Test for post '/' route
    it('Creates developer', (done) => {
        request(app)
            .post('/api/v1/developers')
            .send(fixtures.developer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.developer.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.developer);
            });
            done();
    });

    //  Test for put '/:id' route
    it('Updates developer', (done) => {
        request(app)
            .put('/api/v1/developers/1')
            .send(fixtures.developer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.developer.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.developer);
            });
            done();
    });

    //  Test for delete '/:id' route
    it('Deletes developer', (done) => {
        request(app)
            .delete('/api/v1/developers/1')
            .send(fixtures.developer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    deleted: true
                });
                done();
            });
    });

});