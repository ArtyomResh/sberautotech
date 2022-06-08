module.exports = ({ env }) => {
  const config = {}
  if (env('NODE_ENV') === 'production') {
    config.upload = {
      provider: 'aws-s3-enhanced',
      providerOptions: {
        endpoint: env('S3_ENDPOINT') || 'https://obs.ru-moscow-1.hc.sbercloud.ru',
        accessKeyId: env('S3_ACCESS_KEY_ID'),
        secretAccessKey: env('S3_ACCESS_SECRET'),
        region: env('S3_REGION') || 'ru-moscow-1',
        params: {
          Bucket: env('S3_BUCKET') || 'sberautotech-site-bucket',
        },
        accessLevel: env('ACCESS_LEVEL') || 'public-read'
      }
    }
  };
  return {
    ...config,
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', '10.10.1.24'),
        port: env('SMTP_PORT', 25),
        secure: false,
        ignoreTLS: true,
        auth: {
          user: env('SMTP_USERNAME', ""),
          pass: env('SMTP_PASSWORD', ""),
        }
      },
      settings: {
        defaultFrom: 'feedback@sberautotech.ru'
      },
    }
  }
};
