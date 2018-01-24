import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ImsImeeposHunliDiscuss, ImsImeeposHunliFuyue } from './hunli_discuss.entity';

@Component()
export class HunliDiscussService {
    constructor(
        @Inject('HunliDiscussRepositoryToken') private readonly photoRepository: Repository<ImsImeeposHunliDiscuss>
    ) { }

    async findAll(): Promise<ImsImeeposHunliDiscuss[]> {
        return this.photoRepository.createQueryBuilder()
            .where({})
            .orderBy('create_time', 'DESC')
            .getMany();
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

    async findAll(): Promise<ImsImeeposHunliFuyue[]> {
        return this.photoRepository.createQueryBuilder()
            .where({})
            .orderBy('create_time', 'DESC')
            .getMany();
    }

    async addOne(item: ImsImeeposHunliFuyue): Promise<void> {
        const exist = await this.checkExist(item);
        if (exist) {
            return null;
        }
        return await this.photoRepository.insert(item);
    }

    async checkExist(item: ImsImeeposHunliFuyue): Promise<boolean> {
        const exist = await this.photoRepository
            .createQueryBuilder()
            .where({ mobile: item.mobile })
            .getOne();
        return exist ? true : false;
    }
}