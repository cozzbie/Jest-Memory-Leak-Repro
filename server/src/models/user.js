/*
 * File: User Model
 *
 * Description: This file defines the User Schema object and sets up the model, including custom statics, instance methods,
 * middleware, and more. 
 * 
 * Created by Jamie Corkhill on 04/27/2019 at 11:14 PM (CST), 04/28/2019 at 05:14 AM Zulu
 */

const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    // Using the Firebase UID for _id
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20
    },
    profileDescription: {
        type: String,
        trimmed: true,
        maxlength: 100
    },
    avatarPath: {
        type: String,
        unique: true
    },
    numberOfExchanges: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: [{
        rating: {
            stars: {
                type: Number,
                required: true,
                default: 0
            },
            numberOfRatingsForStars: {
                type: Number,
                required: true,
                default: 0
            }
        }
    }],
    reportsAndFlaggings: {
        type: Array,
        default: undefined
    },
    location: {
        type: {
            type: 'String',
            default: 'Point',
            required: false
        },
        coordinates: {
            type: [Number],
            default: undefined,
            required: false,
            // Note that longitude comes first in GeoJSON
        }
    },
    defaultExchangeRadius: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Defining Instance Methods - ES5 Function because we require "this" binding.
userSchema.methods.toJSON = function () {
    return this.toObject();
};

// Create the model
const User = mongoose.model('User', userSchema);

// Exporting the model by default.
module.exports = User;