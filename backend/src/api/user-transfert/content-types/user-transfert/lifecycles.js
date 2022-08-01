const crypto = require('crypto')

module.exports = {
	afterCreate(event){
	   const { data, where, select, populate } = event.params;
	   data.code = crypto.randomUUID();
	},
	afterUpdate(event) {
	   const { data, where, select, populate } = event.params;
	   console.log('trigerring afterUpdate',populate)
	   /*await strapi.plugins["email"].services.email.send({
	      to: 'louis.jhonny@gmail.com',
	      from: 'no-reply@pacifiktransfert.com',
	      subject: 'Complete transaction',
	      text: ' Thank you for your order. Your money has been sent'
	   }*/
	}
}
