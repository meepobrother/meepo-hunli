# 婚礼互动

>   mysql+nestjs+typeorm+mysql+angular 小项目自用，socket实时互动

- [demo](https://meepo.com.cn/app/index.php?i=2&c=entry&do=index&m=meepo_hunli)

- 微信端

```sh
git clone https://github.com/meepobrother/meepo-hunli.git
yarn
yarn start
```

- 服务器
```sh
cd service && yarn && yarn start
```


- [数据库配置文件](service/src/database.providers.ts)

```ts
// 数据库配置
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'mysql host', // 地址
      port: 3306,// 端口号
      username: 'username',// 用户名
      password: 'password',// 密码
      database: 'some data base',// 数据库
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
    }),
  },
];


```

- [图片地址配置](src/app/app.module.ts)
```ts
import { BASE_SRC } from './lazyload-background/lazyload-background';
@NgModule({
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: './'
    },
    {
      provide: BASE_SRC,
      useValue: '../addons/meepo_hunli/template/mobile/' // 图片服务器地址
    }
  ]
})
export class AppModule { }

```