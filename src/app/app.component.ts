import {
  Component, ViewContainerRef,
  OnInit, AfterViewInit, ViewChild,
  Renderer2, isDevMode
} from '@angular/core';
import { MnFullpageOptions } from './fullpage';
import { Subject } from 'rxjs/Subject';
import { DanmuItemComponent } from './danmus/danmu-item';
import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
export const randomContents = [
  '为我们送上祝福吧',
  '新郎帅不帅',
  '新娘美不美',
  '来，在这输入，我带你飞',
  '听说你知道新郎的秘密',
  '听说你知道新娘的秘密',
  '来不及解释了，快上车',
  '颜值高的和祝福多的都有机会中奖',
  '据说2月7号弹幕会下红包雨',
  '你怎么才来啊',
  '终于等到你，还好我没放弃',
  '让祝福飞一会儿',
  '你知道新郎和新娘是怎么认识的吗',
  '执子之手，与子一起抢红包',
  '天将降红包于斯人也',
  '百年好合，红包大额',
  '新婚大喜喜洋洋，合家欢乐乐洋洋',
  '今天的风洋溢着喜悦与欢乐，今天的天弥漫著幸福与甜蜜',
  '天搭鹊桥，人间巧奇，一对鸳鸯，恰逢新禧，花开成双',
  '喜接连理，甜甜蜜蜜，百年夫妻',
  '天喜，地喜，人也喜，物喜，事喜，样样喜',
  '让这缠绵的诗句，敲响幸福的钟声。',
  '愿你俩永浴爱河，白头偕老!',
  '愿你俩恩恩爱爱，意笃情深',
  '此生爱情永恒，爱心与日俱增!',
  '祝你们永结同心，百年好合!新婚愉快，甜甜蜜蜜!',
  '千里姻缘情牵引，高山万水难断爱。今朝已定百年好',
  '愿祝新人共白首!',
  '白首齐眉鸳鸯比翼，青阳启瑞桃李同心。',
  '房花烛交颈鸳鸯双得意，夫妻恩爱和鸣凤鸾两多情'
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  cfg: any = {
    mnFullpageAfterLoad: (...args) => {
      this.nowIndex$.next(args[1]);
    }
  };

  nowIndex$: Subject<number>;
  showAdv: boolean = true;
  components: any[] = [];

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('video') video: ElementRef;
  @ViewChild('send') send: ElementRef;

  hasFuyue: boolean = false;

  height: number = 0;
  width: number = 0;
  socket: SocketIOClient.Socket;

  showFuyue: boolean = false;

  fuyues: any[] = [];

  constructor(
    private _view: ViewContainerRef,
    public http: HttpClient,
    public render: Renderer2
  ) {
    this.nowIndex$ = new Subject();
  }

  ngOnInit() {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.createRandomComponents();
    setTimeout(() => {
      this.showAdv = false;
    }, 3000);
    document.addEventListener('WeixinJSBridgeReady', () => {
      this.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', () => {
      this.play();
    }, false);
    if (isDevMode()) {
      this.socket = io('http://localhost:1314');
    } else {
      this.socket = io('https://meepo.com.cn');
    }
    this.socket.emit('hunli.discuss', '');
    this.socket.on('hunli.discuss', (list) => {
      const lists = [];
      list.map((li: any) => {
        lists.push({
          avatar: li.avatar,
          content: li.content
        });
      });
      this.components = lists;
    });

    this.socket.on('hunli.discuss.add', (item) => {
      item['isnew'] = true;
      this.components.push(item);
    });

    this.socket.on('hunli.fuyue.add', (item) => {
      item['isnew'] = true;
      this.fuyues.push(item);
    });

    this.socket.on('hunli.fuyue', (item) => {
      this.fuyues = item || [];
    });
  }

  private createRandomComponents(total: number = 10) {

  }

  ngAfterViewInit() {
    this.audio.nativeElement.play();
  }

  switchPlay() {
    if (this.audio.nativeElement.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.audio.nativeElement.play();
  }

  pause() {
    this.audio.nativeElement.pause();
  }

  doSend() {
    const content = this.send.nativeElement.value;
    const data = {
      content: content,
      openid: UserInfo.openid,
      avatar: UserInfo.avatar,
      create_time: Math.floor(new Date().getTime() / 1000)
    };
    this.socket.emit('hunli.discuss.add', data);
    this.send.nativeElement.value = '';
  }
  doFuyue() {
    this.showFuyue = true;
  }

  confirmFuyue(e: any) {
    this.socket.emit('hunli.fuyue.add', e);
  }

  cancelFuyue(e: any) {
    this.showFuyue = false;
  }
}
