'use strict';

/**
 * send-money router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::send-money.send-money');
