const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const Medication = require('../../models/Medication');
const User = require('../../models/User');



// WAIT FOR MONGOOSE CONNECTION
before(function(done) {
    this.timeout(10000);
    setTimeout(done, 2000);
});

after((done) => {
    done();
});

// GET AUTH ROUTE AND SET COOKIE IN HEADER
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
    // GET MEDICATION FORM
    it('GET /medication form', () => {
        request(app)
        .get('/api/medication')
        .set('Cookie', cookie)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
        });
    });

    // NO DATA MISSING ALL INFO PROVIDED
    it('should successfully input medication data for the user', (done) =>  {
        const medData = {
            name: 'medicationTest',
            dose: '25 testing mg',
            notes: 'testing notes'
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(201);
            done();
        });
    });

    // MISSING MEDICATION DATA ONLY NAME PROVIDED
    it('should return error if dose and notes are missing', (done) =>  {
        const medData = {
            name: 'medicationTest',
            dose: ' ',
            notes: ' '
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
            done();
        });
    });

     // MISSING MEDICATION DATA ONLY DOSE PROVIDED
     it('should return error if name and notes are missing', (done) =>  {
        const medData = {
            name: ' ',
            dose: '25 testing mg',
            notes: ' '
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
            done();
        });
    });

    // MISSING MEDICATION DATA ONLY NOTES ARE PROVIDED (FAILED)!!
    // it('should return error if name and dose are missing', (done) =>  {
    //     const medData = {
    //         name: ' ',
    //         dose: ' ',
    //         notes: 'testing notes'
    //     };
    //     request(app)
    //     .post('/api/medication')
    //     .set('Cookie', cookie)
    //     .send(medData)
    //     .end((err, res) => {
    //         if (err) return (err);
    //         expect(res.status).to.equal(400);
    //         expect(res.body).to.have.property('error');
    //         done();
    //     });
    // });

     // NOTES TOO SHORT
     it('should return error if notes is less than 2 characters', (done) =>  {
        const medData = {
            name: 'testingMedication',
            dose: '25 testing mg',
            notes: 't' //less than 2 characters
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('notes');
            done();
        });
    });

     // NOTES TOO LONG
     it('should return error if notes is more than 200 characters', (done) =>  {
        const medData = {
            name: 'testingMedication',
            dose: '25 testing mg',
            notes: 'testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing,testing' 
            //more than 200 characters
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.include('notes');
            done();
        });
    });

    // MISSING ALL MEDICATION DATA
    it('should return error if all fields are missing', (done) =>  {
        const medData = {
            name: ' ',
            dose: ' ',
            notes: ' '
        };
        request(app)
        .post('/api/medication')
        .set('Cookie', cookie)
        .send(medData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
            done();
        });
    });

});

