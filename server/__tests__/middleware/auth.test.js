const request = require('supertest');
const app = require('./../../src/app');
const connectionFactory = require('./../../src/db/mongoose');

let agent, server, connection;

// Database Fixtures
const { userOneToken, configureDatabase } = require('./../fixtures/db');

// Testing
const auth = require('./../../src/middleware/auth');

// Hooks - Before All
beforeAll(async () => {
    connection = await connectionFactory();
    await configureDatabase();

    app.use(auth).get('/', (req, res) => res.send());

    new Promise((resolve, reject) => {
        server = app.listen(4000, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    agent = request.agent(server);
});

afterAll(async () => {
    await connection && connection.disconnect();
    await new Promise((resolve, reject) => server.close((err) => {
        if (err) return reject(err);

        resolve();
    }));
});

describe('Express Auth Middleware', () => {
    test('Should return 401 with an invalid token', async () => {
        await agent
            .get('/')
            .set('Authorization', 'Bearer 123')
            .send()
            .expect(401);
    });

    test('Should return 401 without an Authorization Header', async () => {
        await agent
            .get('/')
            .send()
            .expect(401);  
    });
    
    test('Should return 200 with a valid token', async () => {
        await agent
            .get('/')
            .set('Authorization', `Bearer ${userOneToken}`)
            .send()
            .expect(200);
    });
});
