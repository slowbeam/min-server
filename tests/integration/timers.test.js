const request = require('supertest');
const {Timer} = require('../../models/timer.model');
const {User} = require('../../models/user.model');
let server;

describe('/api/v1/timers', () => {
    
    beforeEach(() => { server = require('../../index'); });
    
    afterEach( async() => { 
        await server.close();
        await Timer.remove({});
        await User.remove({}); 
    });

    describe('GET /', () => {
        it('should return all timers', async () => {
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
                    intervalNumber: 11111,
                    hours: '10',
                    minutes: '10',
                    seconds: '10'
                },
                { 
                    user: user2, 
                    isPomodoro: false, 
                    currentTime: 20,
                    intervalNumber: 22222,
                    hours: '20',
                    minutes: '20',
                    seconds: '20'
                }
            ]);
            const res = await request(server).get('/api/v1/timers');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });

    describe('GET /:id', () => {
        it('should return a timer if valid id is passed', async () => {
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
                    intervalNumber: 11111,
                    hours: '10',
                    minutes: '10',
                    seconds: '10'
                }
            );
            await timer.save();
            const res = await request(server).get('/api/v1/timers/' + timer._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('intervalNumber', timer.intervalNumber);
        });
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/v1/timers/111111111111111111111111');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        // Define the happy path, and before each test, change one parameter that clearly aligns with the test
        let token;
        let isPomodoro;
        let currentTime;
        let intervalNumber;
        let hours;

        const exec = async () => {
            const user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });

            await user.save();

            return await request(server)
                .post('/api/v1/timers')
                .set('x-auth-token', token)
                .send({ 
                    userId: user._id, 
                    isPomodoro: isPomodoro, 
                    currentTime: currentTime,
                    intervalNumber: intervalNumber,
                    hours: hours,
                    minutes: '10',
                    seconds: '10'
            });
        }

        beforeEach(() => {
            token = new User().generateAuthToken(); 
            isPomodoro = false;
            currentTime = 10;
            intervalNumber = 11111;
            hours = "10";
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec(); 
            expect(res.status).toBe(401);
        });
        it('should return 400 if isPomodoro is not a boolean', async () => {
            isPomodoro = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if currentTime is not a number', async () => {
            currentTime = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if intervalNumber is not a number', async () => {
            intervalNumber = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if hours is longer than 2 characters', async () => {
            hours = "000";
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should save the timer if it is valid', async () => {
            await exec();
            const timer = await Timer.find({ intervalNumber: 11111});
            expect(timer[0]).not.toBeNull();
        });
        it('should return the timer if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('isPomodoro', false);
            expect(res.body).toHaveProperty('currentTime', 10);
            expect(res.body).toHaveProperty('intervalNumber', 11111);
            expect(res.body).toHaveProperty('hours', '10');
            expect(res.body).toHaveProperty('minutes', '10');
            expect(res.body).toHaveProperty('seconds', '10');
        });
    });

    describe('PUT /:id', () => {

        // Define the happy path, and before each test, change one parameter that clearly aligns with the test
        let token;
        let timer;
        let user;
        let id;
        let newPomodoro;
        let newCurrentTime;
        let newintervalNumber;
        let newTimerHours;
        let newTimerMinutes;
        let newTimerSeconds;

        const exec = async () => {
            return await request(server)
                .put('/api/v1/timers/' + id)
                .set('x-auth-token', token)
                .send({
                    isPomodoro: newPomodoro,
                    currentTime: newCurrentTime,
                    intervalNumber: newintervalNumber,
                    hours: newTimerHours,
                    minutes: newTimerMinutes,
                    seconds: newTimerSeconds
                });
        }

        beforeEach( async() => {
            user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });

            await user.save();

            timer = new Timer({
                user: user, 
                isPomodoro: false,
                currentTime: 10,
                intervalNumber: 11111,
                hours: "10",
                minutes: '10',
                seconds: '10'
            });

            await timer.save();
            token = user.generateAuthToken();
            id = timer._id;
            newPomodoro = true;
            newCurrentTime = 20;
            newintervalNumber = 22222;
            newTimerHours = "20";
            newTimerMinutes = "20";
            newTimerSeconds = "20";
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec(); 
            expect(res.status).toBe(401);
        });
        it('should return 400 if isPomodoro is not a boolean', async () => {
            newPomodoro = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if currentTime is not a number', async () => {
            newCurrentTime = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if intervalNumber is not a number', async () => {
            newintervalNumber = 'a';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if hours is longer than 2 characters', async () => {
            newTimerHours = "000";
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should save the timer if it is valid', async () => {
            await exec();
            const timer = await Timer.find({ intervalNumber: 11111});
            expect(timer[0]).not.toBeNull();
        });
        it('should return 404 if id is invalid', async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should update the timer if input is valid', async () => {
            await exec();

            const updatedTimer = await Timer.findById(id);
            expect(updatedTimer.isPomodoro).toBe(true);
            expect(updatedTimer.currentTime).toBe(20);
            expect(updatedTimer.intervalNumber).toBe(22222);
            expect(updatedTimer.hours).toBe("20");
            expect(updatedTimer.minutes).toBe("20");
            expect(updatedTimer.seconds).toBe("20");
        });
        it('should return the updated timer if input is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('isPomodoro');
            expect(res.body).toHaveProperty('currentTime');
            expect(res.body).toHaveProperty('intervalNumber');
            expect(res.body).toHaveProperty("hours");
            expect(res.body).toHaveProperty("minutes");
            expect(res.body).toHaveProperty("seconds");
        });
    });
    describe('DELETE /:id', () => {

        // Define the happy path, and before each test, change one parameter that clearly aligns with the test
        let token;
        let timer;
        let user;
        let id;

        const exec = async () => {
            return await request(server)
                .delete('/api/v1/timers/' + id)
                .set('x-auth-token', token)
                .send();
        }

        beforeEach( async() => {
            // Before each test we create a user and timer and save them to the database
            user = new User({
                name: "name name",
                email: "name@gmail.com",
                password: "123456"
            });

            await user.save();

            timer = new Timer({
                user: user, 
                isPomodoro: false,
                currentTime: 10,
                intervalNumber: 11111,
                hours: "10",
                minutes: '10',
                seconds: '10'
            });

            await timer.save();
            token = user.generateAuthToken();
            id = timer._id;
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec(); 
            expect(res.status).toBe(401);
        });
        it('should return 404 if id is invalid', async () => {
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should delete the timer if input is valid', async () => {
            await exec();

            const timerInDB = await Timer.findById(id);
            expect(timerInDB).toBeNull();
        });
        it('should return the removed timer if input is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id', timer._id.toHexString());
            expect(res.body).toHaveProperty('isPomodoro', false);
            expect(res.body).toHaveProperty('currentTime', 10);
            expect(res.body).toHaveProperty('intervalNumber', 11111);
            expect(res.body).toHaveProperty("hours", "10");
            expect(res.body).toHaveProperty("minutes", "10");
            expect(res.body).toHaveProperty("seconds", "10");
        });
    });
});