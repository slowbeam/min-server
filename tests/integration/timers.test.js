const request = require('supertest');
const mongoose = require('mongoose');
const {Timer} = require('../../models/timer.model');
const {User} = require('../../models/user.model');
let server;

describe('/api/v1/timers', () => {
    
    beforeEach(() => { server = require('../../index'); });
    
    afterEach(async () => { 
        server.close(); 
        await Timer.remove({});
        await User.remove({});
    });

    describe('GET /', () => {
        it ('should return all timers', async () => {
            const user1 = new User({
                name: "testUser One",
                email: "1@gmail.com",
                password: "123456"
            });
            const user2 = new User({
                name: "testUser Two",
                email: "2@gmail.com",
                password: "123456"
            });
            await user1.save();
            await user2.save();
            await Timer.collection.insertMany([
                { 
                    user: user1, 
                    isPomodoro: false, 
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: '10',
                    timerMinutes: '10',
                    timerSeconds: '10'
                },
                { 
                    user: user2, 
                    isPomodoro: false, 
                    currentTime: 20,
                    intervalNum: 22222,
                    timerHours: '20',
                    timerMinutes: '20',
                    timerSeconds: '20'
                }
            ]);
            const res = await request(server).get('/api/v1/timers');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });

    describe('GET /:id', () => {
        it ('should return a timer if valid id is passed', async () => {
            const user = new User({
                name: "test test",
                email: "test@gmail.com",
                password: "123456"
            });
            const timer = new Timer(
                { 
                    user: user, 
                    isPomodoro: false, 
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: '10',
                    timerMinutes: '10',
                    timerSeconds: '10'
                }
            );
            await timer.save();
            const res = await request(server).get('/api/v1/timers/' + timer._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('intervalNum', timer.intervalNum);
        });
        // it ('should return 404 if invalid id is passed', async () => {
        //     const res = await request(server).get('/api/v1/timers/111111111111111111111111');
        //     expect(res.status).toBe(404);
        // });
    });

    describe('POST /', () => {
        it ('should return 401 if client is not logged in', async () => {
            const res = await request(server)
                .post('/api/v1/timers')
                .send({ 
                    userId: '1', 
                    isPomodoro: false, 
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: '10',
                    timerMinutes: '10',
                    timerSeconds: '10'
            });   
            expect(res.status).toBe(401);
        });
        it ('should return 400 if isPomodoro is not a boolean', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({
                    userId: user._id,
                    isPomodoro: 'a',
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: "00",
                    timerMinutes: "00",
                    timerSeconds: "00"
            });
            expect(res.status).toBe(400);
        });
        it ('should return 400 if currentTime is not a number', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id,
                    isPomodoro: false,
                    currentTime: 'a',
                    intervalNum: 11111,
                    timerHours: "00",
                    timerMinutes: "00",
                    timerSeconds: "00"
            });
            expect(res.status).toBe(400);
        });
        it ('should return 400 if intervalNum is not a number', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id,
                    isPomodoro: false,
                    currentTime: 10,
                    intervalNum: 'a',
                    timerHours: "00",
                    timerMinutes: "00",
                    timerSeconds: "00"
            });
            expect(res.status).toBe(400);
        });
        it ('should return 400 if timerHours is longer than 2 characters', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id,
                    isPomodoro: false,
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: "000",
                    timerMinutes: "00",
                    timerSeconds: "00"
            });
            expect(res.status).toBe(400);
        });
        it ('should save the timer if it is valid', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id, 
                    isPomodoro: false, 
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: '10',
                    timerMinutes: '10',
                    timerSeconds: '10'
            });
            const timer = await Timer.find({ intervalNum: 11111});
            expect(timer[0]).not.toBeNull();
        });
        it ('should return the timer if it is valid', async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });
            await user.save();
            const token = user.generateAuthToken(); 
            const res = await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id, 
                    isPomodoro: false, 
                    currentTime: 10,
                    intervalNum: 11111,
                    timerHours: '10',
                    timerMinutes: '10',
                    timerSeconds: '10'
            });
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('isPomodoro', false);
            expect(res.body).toHaveProperty('currentTime', 10);
            expect(res.body).toHaveProperty('intervalNum', 11111);
            expect(res.body).toHaveProperty('timerHours', '10');
            expect(res.body).toHaveProperty('timerMinutes', '10');
            expect(res.body).toHaveProperty('timerSeconds', '10');
        });
    });


});