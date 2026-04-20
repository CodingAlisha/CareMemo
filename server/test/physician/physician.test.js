const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const Physician = require('../../models/Physician');
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
    // GET PHYSICIAN FORM
    it('GET /physician form', () => {
        request(app)
        .get('/api/physician')
        .set('Cookie', cookie)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
        });
    });

    // NO DATA MISSING ALL INFO PROVIDED CORRECTLY
    it('should successfully input physician data for the user', (done) =>  {
        const phyData = {
            name: 'Physician Test',
            specialty: 'Primary Care Doctor',
            contact: '+18888888888'
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(201);
            done();
        });
    });

    // PHYSICIAN MISSING DATA ONLY NAME PROVIDED
    it('should return error if both specialty and contact are missing', (done) =>  {
        const phyData = {
            name: 'Physician Test',
            specialty: ' ',
            contact: ' '
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            done();
        });
    });
    // PHYSICIAN MISSING DATA ONLY SPECIALTY PROVIDED
    it('should return error if both name and contact are missing', (done) =>  {
        const phyData = {
            name: ' ',
            specialty: 'Primary Care Doctor',
            contact: ' '
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            done();
        });
    });
    // PHYSICIAN MISSING DATA ONLY CONTACT PROVIDED
    it('should return error if both name and specialty are missing', (done) =>  {
        const phyData = {
            name: ' ',
            specialty: ' ',
            contact: '1-888-888-8888'
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            done();
        });
    });

    // PHYSICIAN CONTACT DATA IS NOT A VALID NUMBER
    it('should return error if contact is invalid', (done) =>  {
        const phyData = {
            name: 'Physician Test',
            specialty: 'Primary Care Doctor',
            contact: '1-888-HYG-sg8s'
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            done();
        });
    });
    // PHYSICIAN MISSING ALL DATA NO DATA PROVIDED
    it('should should return error if all fields are missing', (done) =>  {
        const phyData = {
            name: ' ',
            specialty: ' ',
            contact: ' '
        };
        request(app)
        .post('/api/physician')
        .set('Cookie', cookie)
        .send(phyData)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            done();
        });
    });
});