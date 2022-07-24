
module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: 'smtp.mailtrap.io',
      port: '25',
      auth: {
        user: '7a4fdb477a6e3c' ,
        pass: 'e674d0f73eab8c'
      },
    },
   }
})
