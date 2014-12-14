'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  nyt: process.env.TIMES,

  twit: {
        consumer_key: 's66nH2xRSBvwVm4thYCgI0TiI',
        consumer_secret: process.env.TWIT_CONSUMER,
        access_token: '2919106498-Mhb84uKJ0r0vCKsYR4X0xwMv2eUK6qNVYwvlPIx',
        access_token_secret: process.evn.TWIT_SECRET
    },

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/georgiestclaire'
  }
};