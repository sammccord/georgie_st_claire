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

nyt: 'd6063f8494f02a6bca958b5de50d7646:3:70396827',

    twit: {
        consumer_key: 's66nH2xRSBvwVm4thYCgI0TiI',
        consumer_secret: 'UBjO8gQkuHERCkhSu6O6oEBWVjvgx8AWycJmeb55QBmMdS2E1m',
        access_token: '2919106498-Mhb84uKJ0r0vCKsYR4X0xwMv2eUK6qNVYwvlPIx',
        access_token_secret: 'AxWa5heUGN5uPIkXujM5A7OfgWnhFt2wi4Pi7sLT0RLvO'
    },

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/georgiestclaire'
  }
};