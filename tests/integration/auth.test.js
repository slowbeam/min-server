const request = require('supertest');
const {Timer} = require('../../models/timer.model');
const {User} = require('../../models/user.model');

describe('auth middleware', () => {
    beforeEach(() => { server = require('../../index'); }); 
    afterEach(async () => { 
        await server.close();
        await Timer.remove({});
        await User.remove({});   
    });

    let token; 

    const exec = async () => {
        const user = new User({
            name: "name name",
            email: "name@gmail.com",
            password: "123456"
        });

        await user.save();

        return request(server)
            .post('/api/v1/timers')
            .set('x-auth-token', token)
            .send({ 
                userId: user._id, 
                isPomodoro: false, 
                currentTime: 10,
                intervalNumber: 11111,
                hours: '10',
                minutes: '10',
                seconds: '10'
        });
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it ('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it ('should return 400 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it ('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});