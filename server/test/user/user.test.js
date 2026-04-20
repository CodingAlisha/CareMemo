const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// To run a new test change the user email for user and login to have 18 passing tests

// WAIT FOR MONGOOSE CONNECTION

before(function(done) {
    this.timeout(10000);
    setTimeout(done, 2000);
});

// TEST USER SIGNUP

describe('The user will signUp', () => {
    // clean up before each test
    beforeEach(async() => {
        await User.deleteMany({});
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    describe('GET /signUp', () => {
        it('should return the signUp form', (done) => {
            request(app)
            .get('/api/signUp')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                done();
            });
        });
    });
});

// CREATE USER DATA
describe('POST /signUp', () => {
    it('should successfully create a new user', (done) => {
        const newUser = {
            firstName: 'Testing',
            lastName: 'Application',
            email: 'test1@testing.com', 
            password: 'password1234',
            password: 'password1234'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if (err) return done (err);
            expect(res.status).to.be.equal(201);
            expect(res.body).to.have.property('user');
            expect(res.body.user).to.be.a('string');

            // CHECK THAT JWT COOKIE WAS SET
            expect(res.headers['set-cookie']).to.exist;
            expect(res.headers['set-cookie'][0]).to.include('jwt=');
            done();
        });
    });
    // MISSING USER DATA ONLY PASSWORD PROVIDED
    it('should return error if email is missing', (done) =>  {
        const newUser = {
            password: 'password1234'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // MISSING USER DATA ONLY EMAIL PROVIDED
    it('should return error if email is missing', (done) =>  {
        const newUser = {
            email: 'test1@testing1234'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // MISSING USER DATA ONLY FIRST NAME PROVIDED
    it('should return error if email is missing', (done) =>  {
        const newUser = {
            firstName: 'Testing'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // MISSING USER DATA ONLY LAST NAME PROVIDED
    it('should return error if email is missing', (done) =>  {
        const newUser = {
            lastName: 'Application'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if (err) return (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // INVALID EMAIL
    it('should return error if email is invalid', (done) => {
        const newUser = {
            firstName: 'Testing',
            lastName: 'Application',
            email: 'invalid-email', 
            password: 'password1234',
            password: 'password1234'
        };
        request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if(err) return done (err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // DUPLICATE EMAIL
    // it('should return error if email already exist', (done) => {
    //     const newUser = {
    //         firstName: 'TestingDuplicate',
    //         lastName: 'Application',
    //         email: 'test@testing.com', 
    //         password: 'password1234',
    //         password: 'password1234'
    //     };
    //     //  CREATE A NEW USER
    //     User.create(newUser).then(() => {
    //         // TRY TO REGISTER WITH THE SAME EMAIL
    //         request(app)
    //         .post('/api/signUp')
    //         .send(newUser)
    //         .end((err, res) => {
    //             if(err) return done(err);
    //             expect(res.status).to.equal(400);
    //             expect(res.body).to.have.property('errors');
    //             done();
    //         });
    //      });
    // });
    // PASSWORD TOO SHORT
    it('should return error if the password is too short', (done) => {
        const newUser = {
            firstName: 'Testing',
            lastName: 'Application',
            email: 'test1@testing.com', 
            // password: '234',
            password: '234'
        };
     request(app)
        .post('/api/signUp')
        .send(newUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors')
            done();
        });
    });
    // HASH PASSWORD
    it('should hash the password before saving', async () => {
        const newUser = {
            firstName: 'Testing',
            lastName: 'Application',
            email: 'test1@testing.com', 
            // password: '234',
            password: 'password1234'
        };
        await request(app)
        .post('/api/signUp')
        .send(newUser)

        //VERIFY PASSWORD WAS HASHED
        const user = await User.findOne({email: newUser.email});
        expect(user.password).to.not.equal('password1234');
        expect(user.password).to.have.length.above(10); // should be hashed
    });
});

// USER LOGIN TEST
describe('The user will login', () => {
    // CREATE A TEST USER BEFORE EACH TEST
    beforeEach(async () => {
        await User.deleteMany({});
    //CREATE A TEST USER
    testUser = await User.create({
        firstName: 'testUser',
        lastName: 'Application',
        email:'testuser1@email.com',
        password: 'password1234'
        });
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    describe('GET /login', () => {
        it('should return the login form', (done) => {
            request(app)
            .get('/api/login')
            .end((err, res) => {
                if(err) return done(err)
                    expect(res.status).to.equal(200);
                done();
            });
        });
    });
    //LOGIN POST
    describe('POST /login', () => {
        it('should successfully log in with correct credentials', (done) => {
            const loginUser = {
                email:'testuser1@email.com',
                password: 'password1234'
            };
            request(app)
            .post('/api/login')
            .send(loginUser)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('string'); // Should be user ID

        // CHECK JWT COOKIE WAS SET
        expect(res.headers ['set-cookie']).to.exist;
        expect(res.headers['set-cookie'][0]).to.include('jwt=');
        done();
            });
        });
    });
    it('should return error if email does not exist', (done) => {
        const loginUser = {
            email:'userdoesnotexist@email.com',
            password: 'password1234'
        };
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // USER HAS INCORRECT PASSWORD
    it('should return error if password is wrong', (done) => {
        const loginUser = {
            email:'testuser1@email.com',
            password: 'wrongPassword'
        };
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // USER HAS MISSING EMAIL
    it('should return error if email is missing', (done) => {
        const loginUser = {
            email:' ',
            password: 'password1234'
        };
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
     // USER HAS MISSING PASSWORD
     it('should return error if password is missing', (done) => {
        const loginUser = {
            email:'testuser1@email.com',
            password: ' '
        };
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // USER HAS MISSING EMAIL & PASSWORD
    it('should return error if email and password are missing', (done) => {
        const loginUser = {
            email:' ',
            password: ' '
        };
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('errors');
            done();
        });
    });
    // SET HTTP ONLY COOKIES
    it('should set httpOnly cookies on successful login', (done) => {
        const loginUser = {
            email: 'testuser1@email.com',
            password: 'password1234'
        }
        request(app)
        .post('/api/login')
        .send(loginUser)
        .end((err, res) => {
            if(err) return done(err);
            
            const cookies = res.headers['set-cookie'];
            expect(cookies).to.exist;

            //CHECK FOR HTTP ONLY
            const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));
            expect(jwtCookie).to.include('HttpOnly');
            done();
        });
    });
    //USER LOG OUT
    describe('GET /logout', () => {
        it('should clear jwt cookie and redirect to landing page', (done) => {
            request(app)
            .get('/api/logout')
            // .redirects(0)
            .end((err, res) => {
                if(err) return done(err);
                //CLEAR COOKIES UPON LOG OUT
                const cookies = res.headers['set-cookie'];
            

                expect(cookies).to.exist;
                expect(cookies[0]).to.include('jwt=');
                done();
            });
        });
    });
});