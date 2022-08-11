'use strict';

/**
 *  send-money controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::send-money.send-money');
