/*
 * File: auth.js
 *
 * Description: The auth function is a middleware function that will handle securing the endpoints that require being 
 * locked down to prevent unauthorized access.
 * 
 * It receives a JSON Web Token (Firebase ID Token) as a Bearer Token, decodes it, gets the user's UID, finds their
 * corresponding document, and if it exists, returns the user object on req.user for the endpoint. If not, an HTTP
 * 401 is thrown.
 * 
 * Created by Jamie Corkhill on 04/28/2019 at 04:24 PM (Local), 09:24 PM Zulu
 */

const admin = require('firebase-admin');

// Models - User
const User = require('./../models/user');

const auth = async (req, res, next) => {
    try {
        // The Authorization Bearer Token sent in the header of the request needs to be decoded.
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = await admin.auth().verifyIdToken(token);

        // Finding that user in the database by their Firebase UID.
        const user = await User.findOne({ _id: decoded.uid });

        // If that user does not exist, we'll throw an error.
        if (!user) {
            throw new Error();
        }

        // Making the user accessible to the endpoint.
        req.user = user;

        // Proceed
        next();
    } catch (e) {
        // HTTP 404 Unauthorized Response Status
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;