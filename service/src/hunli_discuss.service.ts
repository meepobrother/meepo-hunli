import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ImsImeeposHunliDiscuss, ImsImeeposHunliFuyue } from './hunli_discuss.entity';

@Component()
export class HunliDiscussService {
    constructor(
        @Inject('HunliDiscussRepositoryToken') private readonly photoRepository: Repository<ImsImeeposHunliDiscuss>
    ) { }

    async findAll(): Promise<ImsImeeposHunliDiscuss[]> {
        return await this.photoRepository.find();
    }

    async addOne(item: ImsImeeposHunliDiscuss): Promise<void> {
        return await this.photoRepository.insert(item);
    }
}

@Component()
export class HunliFuyueService {
    constructor(
        @Inject('HunliFuyueRepositoryToken') private readonly photoRepository: Repository<ImsImeeposHunliFuyue>
    ) { }

    async findAll(): Promise<ImsImeeposHunliDiscuss[]> {
        return await this.photoRepository.find();
    }

    async addOne(item: ImsImeeposHunliDiscuss): Promise<void> {
        return await this.photoRepository.insert(item);
    }
}