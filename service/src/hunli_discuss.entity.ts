import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImsImeeposHunliDiscuss {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 640 })
    avatar: string;

    @Column() content: string;

    @Column() openid: string;

    @Column() create_time: number;
}


@Entity()
export class ImsImeeposHunliFuyue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 640 })
    avatar: string;

    @Column() content: string;

    @Column() openid: string;

    @Column() realname: string;
    @Column() mobile: string;
    @Column() nickname: string;

    @Column() create_time: number;
}