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
  },
  upload: {
    provider: 'aws-s3-enhanced',
    providerOptions: {
      endpoint: env('S3_ENDPOINT') || 'https://obs.ru-moscow-1.hc.sbercloud.ru',
      accessKeyId: env('S3_ACCESS_KEY_ID') || 'IAHDXUC6V3E8PQPFO6N3',
      secretAccessKey: env('S3_ACCESS_SECRET') || 'mQeBl13v4Hj9wAfc7peypn7Rns9HD7r2cIu6gkG2',
      region: env('S3_REGION') || 'ru-moscow-1',
      params: {
        Bucket: env('S3_BUCKET') || 'sberautotech-site-bucket',
      },
      accessLevel: env('ACCESS_LEVEL') || 'public-read'
    },
  }
});
