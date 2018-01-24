import { Get, Controller } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { HunliDiscussService, HunliFuyueService } from './hunli_discuss.service';

@WebSocketGateway({ port: 1314 })
export class AppGeteway {
  @WebSocketServer() server;

  constructor(private hunli: HunliDiscussService, private fuyue: HunliFuyueService) {

  }

  @SubscribeMessage('hunli.discuss')
  async handelHunliDiscuss(sender, data) {
    const list = await this.hunli.findAll();
    sender.emit('hunli.discuss', list);
  }

  @SubscribeMessage('hunli.discuss.add')
  async handelHunliDiscussAdd(sender, data) {
    const item = await this.hunli.addOne(data);
    const list = await this.hunli.findAll();
    sender.broadcast.emit('hunli.discuss.add', data);
    sender.emit('hunli.discuss.add', data);
  }

  @SubscribeMessage('hunli.fuyue')
  async handelHunliFuyue(sender, data) {
    const list = await this.fuyue.findAll();
    sender.emit('hunli.fuyue', list);
  }

  @SubscribeMessage('hunli.fuyue.add')
  async handelHunliFuyueAdd(sender, data) {
    const item = await this.fuyue.addOne(data);
    if (item) {
      const list = await this.fuyue.findAll();
      sender.broadcast.emit('hunli.fuyue.add', data);
      sender.emit('hunli.fuyue.add', data);
    }
  }
}

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }
}
