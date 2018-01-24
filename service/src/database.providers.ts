import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: '121.42.158.224',
      port: 3306,
      username: 'root',
      password: 'yang1989.',
      database: 'we7',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
    }),
  },
];
