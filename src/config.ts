export default {
    status: {
      options: {
        path: '/status',
        title: 'API Monitor',
        routeConfig: {
          auth: false,
        },
      },
    },
    dbConfig: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "digilib_db",
      entities: "**/**.entity{.ts,.js}"
    },
    token: {
      secret_key: '23423523fdvfdghjre234kdnsbgjksdbgkdbsk'
    },
};
  