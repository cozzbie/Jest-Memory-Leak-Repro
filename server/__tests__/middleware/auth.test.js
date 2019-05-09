const request = require('supertest');
const app = require('./../../src/app');

// Database Fixtures
const { userOneToken, configureDatabase } = require('./../fixtures/db');

// Testing
const auth = require('./../../src/middleware/auth');

// Hooks - Before All
beforeAll(async () => {
    await configureDatabase();
    app.use(auth).get('/', (req, res) => res.send());
});

describe('Express Auth Middleware', () => {
    test('Should return 401 with an invalid token', async () => {
        await request(app)
            .get('/')
            .set('Authorization', 'Bearer 123')
            .send()
            .expect(401);
    });

    test('Should return 401 without an Authorization Header', async () => {
        await request(app)
            .get('/')
            .send()
            .expect(401);  
    });
    
    test('Should return 200 with a valid token', async () => {
        console.log(userOneToken);
        await request(app)
            .get('/')
            .set('Authorization', `Bearer ${userOneToken}`)
            .send()
            .expect(200);
    });
});
