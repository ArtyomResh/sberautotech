module.exports = ({ env }) => {
  const config = {}
  if (env('NODE_ENV') === 'production') {
    config.upload = {
      provider: 'aws-s3-enhanced',
      providerOptions: {
        endpoint: env('S3_ENDPOINT'),
        accessKeyId: env('S3_ACCESS_KEY_ID'),
        secretAccessKey: env('S3_ACCESS_SECRET'),
        region: env('S3_REGION'),
        params: {
          Bucket: env('S3_BUCKET'),
        },
        accessLevel: env('ACCESS_LEVEL')
      }
    }
  };
  return {
    ...config,
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
  }
};
