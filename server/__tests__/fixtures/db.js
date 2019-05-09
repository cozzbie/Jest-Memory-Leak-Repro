/*
 * File: db.js
 *
 * Description: This file exports particular fixtures and sets up seed data for the unit tests.
 * 
 * Created by Jamie Corkhill 04/28/2019 
 */

const User = require('./../../src/models/user');

// Test User ID.
const userOneUID = 'GPql3871YieRG1WObn94lVN7xVU2';

// This fake token can be decoded by the mock.
const userOneToken = JSON.stringify({ uid: userOneUID }); // Not an actual token

// Fake user object.
const userOne = {
    _id: userOneUID,
    username: 'Jamie',
    profileDescription: 'My description',
    avatarPath: '/avatar/abc123.jpg',
    location: {
        type: 'Point',
        coordinates: [10, 10]
    },
    defaultExchangeRadius: 50
};

const configureDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

module.exports = {
    // ---------- Users ---------- //
    // User One
    userOneUID,
    userOneToken,
    userOne,

    // Configure Database
    configureDatabase
};