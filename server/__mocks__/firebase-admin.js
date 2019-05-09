module.exports = {
    auth() {
        return this;
    },
    verifyIdToken(token) {
        // The fake token from the test is passed as { uid: 'example UID' }; 
        // This lets the auth function strip the UID straight off the mock to proceed in the test database.
        return JSON.parse(token);
    },
    initializeApp(app) {

    },
    credential: {
        cert() {

        }
    }
}