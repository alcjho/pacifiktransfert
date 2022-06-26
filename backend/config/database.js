module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'pacifiktransfert_main'),
      user: env('DATABASE_USERNAME', 'pacifiktransfert_usr'),
      password: env('DATABASE_PASSWORD', 'Bonjour$2022'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
