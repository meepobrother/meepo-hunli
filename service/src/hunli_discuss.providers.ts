import { Connection, Repository } from 'typeorm';
import { ImsImeeposHunliDiscuss, ImsImeeposHunliFuyue } from './hunli_discuss.entity';

export const HunliDiscussProviders = [
    {
        provide: 'HunliDiscussRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(ImsImeeposHunliDiscuss),
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'HunliFuyueRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(ImsImeeposHunliFuyue),
        inject: ['DbConnectionToken'],
    },
];