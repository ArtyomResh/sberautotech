module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.office365.com'),
      port: env('SMTP_PORT', 587),
      auth: {
        user: 'no-reply-dev@sbauto.tech',
        pass: 'Hjg8Bj*@jr7',
      }
    },
    settings: {
      defaultFrom: 'no-reply-dev@sbauto.tech'
    },
  }
});
