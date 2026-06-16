module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5433),
        database: env('DATABASE_NAME', 'sberautotech'),
        username: env('DATABASE_USERNAME', 'user'),
        password: env('DATABASE_PASSWORD', 'admin'),
      },
      options: {
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
