'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Should we populate the DB with sample data?
    seedDB: false,

    nyt: 'd6063f8494f02a6bca958b5de50d7646:3:70396827',

    twit: {
        consumer_key: 's66nH2xRSBvwVm4thYCgI0TiI',
        consumer_secret: 'UBjO8gQkuHERCkhSu6O6oEBWVjvgx8AWycJmeb55QBmMdS2E1m',
        access_token: '2919106498-Mhb84uKJ0r0vCKsYR4X0xwMv2eUK6qNVYwvlPIx',
        access_token_secret: 'AxWa5heUGN5uPIkXujM5A7OfgWnhFt2wi4Pi7sLT0RLvO'
    },

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'georgie-st-claire-secret'
    },

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
