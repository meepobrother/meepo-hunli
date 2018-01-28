import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'mysql host',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'some data base',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
    }),
  },
];
