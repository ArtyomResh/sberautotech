module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.office365.com'),
      port: env('SMTP_PORT', 587),
      auth: {
        user: env('SMTP_USERNAME'),
        pass: env('SMTP_PASSWORD'),
      }
    },
    settings: {
      defaultFrom: 'no-reply-dev@sbauto.tech'
    },
  }
});
