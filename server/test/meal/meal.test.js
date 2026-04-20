const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const Meal = require('../../models/Meal');
const User = require('../../models/User');



// WAIT FOR MONGOOSE CONNECTION
before(function(done) {
    this.timeout(10000);
    setTimeout(done, 2000);
});

after((done) => {
    done();
});

describe('Protected route', () => {
    let cookie;

    before(async () => {
        const res = await request(app)
        .post('/api/login')
        .send({
            email: 'test@testing.com',
            password: 'password1234'
        });
        cookie = res.headers['set-cookie'];
    });
    // GET MEAL FORM
    it('GET /meal form', () => {
        request(app)
        .get('/api/listMeals')
        .set('Cookie', cookie)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
        });
    });

    // NO DATA MISSING ALL INFO PROVIDED CORRECTLY
    it('should successfully input meal data for the user', (done) =>  {
        const mealData = {
            name: 'MEAL TEST',
            mealType: 'BREAKFAST',
            directions: 'meal data'
        };
        request(app)
        .post('/api/listMeals')
        .set('Cookie', cookie)
        .send(mealData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.deep.include({name: 'MEAL TEST'});
            expect(res.body[0]).to.deep.include({mealType: 'BREAKFAST'});
            expect(res.body[0]).to.deep.include({directions: 'meal data'});
            expect(res.status).to.equal(201);
            done();
        });
    });

    //  MISSING DATA NO NAME PROVIDED
     it('should return error if missing name', (done) =>  {
        const mealData = {
            name: ' ',
            mealType: 'BREAKFAST',
            directions: 'testing'
        };
        request(app)
        .post('/api/listMeals')
        .set('Cookie', cookie)
        .send(mealData)
        .end((err, res) => {
            if (err) return (err);
            // console.log(res.body);
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('name');
            done();
            });
        });

         // MISSING DATA NO MEAL TYPE PROVIDED
     it('should return error if missing mealType', (done) =>  {
        const mealData = {
            name: 'MEAL TEST',
            mealType: ' ',
            directions: 'testing'
        };
        request(app)
        .post('/api/listMeals')
        .set('Cookie', cookie)
        .send(mealData)
        .end((err, res) => {
            if (err) return (err);
            console.log(res.body);
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('mealType');
            done();
        });
    });

       // INVALID DATA INVALID MEAL TYPE PROVIDED
       it('should return error if invalid mealType', (done) =>  {
        const mealData = {
            name: 'MEAL TEST',
            mealType: 'INVALID',
            directions: 'testing'
        };
        request(app)
        .post('/api/listMeals')
        .set('Cookie', cookie)
        .send(mealData)
        .end((err, res) => {
            if (err) return (err);
            console.log(res.body);
            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('mealType');
            done();
        });
    });

     //  MISSING DATA NO DIRECTIONS PROVIDED
     it('should return success if missing directions', (done) =>  {
        const mealData = {
            name: 'MEAL TEST',
            mealType: 'BREAKFAST',
            directions: ' ' // not required if user does not have special directions for the meal input
        };
        request(app)
        .post('/api/listMeals')
        .set('Cookie', cookie)
        .send(mealData)
        .end((err, res) => {
            if (err) return (err);
            // console.log(res.body);
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.deep.include({directions: ' '});
            done();
            });
        });
});
