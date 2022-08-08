'use strict';

/**
 * send-money service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::send-money.send-money');
