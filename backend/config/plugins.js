
module.exports = ({ env }) => ({
  ezforms:{
      config:{
        notificationProviders: [
          {
            name: 'email',
            enabled: true,
            config: {
              from: 'infos@pacifiktransfert.com'
            }
          }
        ]
      }
  },
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.mailtrap.io'),
      port: env('SMTP_PORT', 2525),
      auth: {
        user: env('SMTP_USERNAME'),
        pass: env('SMTP_PASSWORD'),
      },
      // ... any custom nodemailer options
    }
  },
})