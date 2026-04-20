const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const Schedule = require('../../models/Schedule');
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
            email: 'test1@testing.com',
            password: 'password1234'
        });
        cookie = res.headers['set-cookie'];
    });
    // GET SCHEDULE FORM
    it('GET /schedule form', () => {
        request(app)
        .get('/api/schedule')
        .set('Cookie', cookie)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
        });
    });

    // NO DATA MISSING ALL INFO PROVIDED CORRECTLY
    it('should successfully input schedule data for the user', (done) =>  {
        const schData = {
            eventType: 'DOCTOR',
            date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
            reason: 'Schedule Test',
            status: 'SCHEDULED'
        };
        request(app)
        .post('/api/schedule')
        .set('Cookie', cookie)
        .send(schData)
        .end((err, res) => {
            if (err) return (err);
            console.log(res.body);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.deep.include({eventType: 'DOCTOR'});
            expect(res.body[0]).to.deep.include({date: '2026-04-16T04:00:00.000Z'});
            expect(res.body[0]).to.deep.include({reason: 'Schedule Test'});
            expect(res.body[0]).to.deep.include({status: 'SCHEDULED'});
            expect(res.status).to.equal(201);
            done();
        });
    });

    // MISSING EVENT TYPE NOT PROVIDED
    it('should return error if eventType is missing', (done) =>  {
        const schData = {
            eventType: ' ',
            date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
            reason: 'Schedule Test',
            status: 'SCHEDULED'
        };
        request(app)
        .post('/api/schedule')
        .set('Cookie', cookie)
        .send(schData)
        .end((err, res) => {
            if (err) return (err);
            console.log(res.body);
            expect(res.status).to.equal(400);

            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('eventType');
            expect(res.body.error).to.include('enum');
            done();
        });
    });

     // MISSING DATE NOT PROVIDED
    it('should return error if date is missing', (done) =>  {
        const schData = {
            eventType: 'DOCTOR',
            date: ' ', 
            reason: 'Schedule Test',
            status: 'SCHEDULED'
        };

        request(app)
        .post('/api/schedule')
        .set('Cookie', cookie)
        .send(schData)
        .end((err, res) => {
            if (err) return (err);
            console.log(res.body);
            expect(res.status).to.equal(400);

            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('date');
            done();
    });
});

   // MISSING REASON NOT PROVIDED
   it('should return error if reason is missing', (done) =>  {
    const schData = {
        eventType: 'DOCTOR',
        date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
        reason: ' ',
        status: 'SCHEDULED'
    };

    request(app)
    .post('/api/schedule')
    .set('Cookie', cookie)
    .send(schData)
    .end((err, res) => {
        if (err) return (err);
        console.log(res.body);
        expect(res.status).to.equal(400);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.include('reason');
        done();
    });
});

   // MISSING STATUS NOT PROVIDED
  it('should return error if status is missing', (done) =>  {
    const schData = {
        eventType: 'DOCTOR',
        date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
        reason: 'Schedule Test',
        status: ' '
    };

    request(app)
    .post('/api/schedule')
    .set('Cookie', cookie)
    .send(schData)
    .end((err, res) => {
        if (err) return (err);
        console.log(res.body);
        expect(res.status).to.equal(400);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.include('status');
        expect(res.body.error).to.include('enum');
        done();
        });
    });

       // INVALID EVENT TYPE
  it('should return error if invalid eventType', (done) =>  {
    const schData = {
        eventType: 'INVALID',
        date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
        reason: 'Schedule Test',
        status: 'SCHEDULED'
    };

    request(app)
    .post('/api/schedule')
    .set('Cookie', cookie)
    .send(schData)
    .end((err, res) => {
        if (err) return (err);
        console.log(res.body);
        expect(res.status).to.equal(400);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.include('eventType');
        expect(res.body.error).to.include('enum');
        done();
        });
    });

       // INVALID STATUS 
  it('should return error if invalid eventType', (done) =>  {
    const schData = {
        eventType: 'DOCTOR',
        date: 'April 16, 2026', //2026-04-16T04:00:00.000Z
        reason: 'Schedule Test',
        status: 'INVALID'
    };

    request(app)
    .post('/api/schedule')
    .set('Cookie', cookie)
    .send(schData)
    .end((err, res) => {
        if (err) return (err);
        console.log(res.body);
        expect(res.status).to.equal(400);

        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.include('status');
        expect(res.body.error).to.include('enum');
        done();
        });
    });
});
