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

    nyt: 'f80d056309d9e423aa6fe1d4d785c961:9:70292841',

    twit: {
        consumer_key: 's66nH2xRSBvwVm4thYCgI0TiI',
        consumer_secret: 'UBjO8gQkuHERCkhSu6O6oEBWVjvgx8AWycJmeb55QBmMdS2E1m',
        access_token: '2919106498-Mhb84uKJ0r0vCKsYR4X0xwMv2eUK6qNVYwvlPIx',
        access_token_secret: 'AxWa5heUGN5uPIkXujM5A7OfgWnhFt2wi4Pi7sLT0RLvO'
    },

    // Server port
    port: process.env.PORT || 9000,

    // Should we populate the DB with sample data?
    seedDB: false,

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
