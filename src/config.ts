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
      database: "",
      entities: "**/**.entity{.ts,.js}"
    }
};
  