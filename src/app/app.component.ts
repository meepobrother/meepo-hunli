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
import { fromEvent } from 'rxjs/observable/fromEvent';
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

const audios = [
  'audio.mp3',
  'audio3.mp3',
  'audio4.mp3',
  'audio5.mp3',
  'audio6.mp3',
  'audio7.mp3',
  'audio8.mp3',
  'audio9.mp3'
];

export interface FuyueForms {
  realname?: string;
  mobile?: string;
  openid?: string;
  avatar?: string;
  content?: string;
  nickname?: string;
  create_time?: number;
}
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
  _audioRandom: string;

  nowIndex$: Subject<number>;
  showAdv: boolean = true;
  components: any[] = [];
  allComponents: any[] = [];

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('video') video: ElementRef;
  @ViewChild('send') send: ElementRef;
  @ViewChild('footer') footer: ElementRef;


  hasFuyue: boolean = false;

  height: number = 0;
  width: number = 0;
  socket: SocketIOClient.Socket;

  showFuyue: boolean = false;

  fuyues: any[] = [];
  fuyueForm: FuyueForms = {};
  begin: number = 10;

  constructor(
    private _view: ViewContainerRef,
    public http: HttpClient,
    public render: Renderer2
  ) {
    this.nowIndex$ = new Subject();
    this.hasFuyue = localStorage.getItem('hasFuyue') ? true : false;
  }
  setAudioRandom() {
    this._audioRandom = `../addons/meepo_hunli/template/mobile/assets/${audios[Math.floor(Math.random() * audios.length)]}`;
    if (this.audio) {
      const audio = this.audio.nativeElement as HTMLAudioElement;
      if (audio) {
        audio.src = this._audioRandom;
        audio.onload = () => {
          audio.play();
        };
      }
    }
  }

  ngOnInit() {
    this.setAudioRandom();
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    setTimeout(() => {
      this.showAdv = false;
    }, 3000);
    document.addEventListener('WeixinJSBridgeReady', () => {
      this.audio.nativeElement.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', () => {
      this.audio.nativeElement.play();
    }, false);
    if (isDevMode()) {
      this.socket = io('http://localhost:1314');
    } else {
      this.socket = io('https://meepo.com.cn');
    }
    this.socket.emit('hunli.discuss', '');
    this.socket.on('hunli.discuss', (list) => {
      const lists = [];
      // 所有的评论
      list.map((li: any) => {
        lists.push({
          avatar: li.avatar,
          content: li.content
        });
      });
      this.allComponents = list;
      this.createRandomComponents();
    });

    this.socket.on('hunli.discuss.add', (item) => {
      item['isnew'] = true;
      this.components.push(item);
    });

    this.socket.on('hunli.fuyue.add', (item) => {
      item['isnew'] = true;
      this.fuyues.unshift(item);
    });
    this.socket.emit('hunli.fuyue', '');
    this.socket.on('hunli.fuyue', (item) => {
      this.fuyues = item || [];
    });
    this.initWx();

    fromEvent(this.send.nativeElement, 'focus').subscribe(res => {
      this.render.setStyle(this.footer.nativeElement, 'position', 'absolute');
    });
    fromEvent(this.send.nativeElement, 'bulr').subscribe(res => {
      this.render.setStyle(this.footer.nativeElement, 'position', 'fixed');
    });
  }

  initWx() {
    wx.ready(() => {
      const data = {
        title: '杨明明&闫聪玲-我们要结婚啦',
        desc: '时间：农历22，阳历2月7号,地址： 安阳市滑县万古镇棘马林村',
        link: sysinfo.siteurl,
        imgUrl: 'https://meepo.com.cn/addons/meepo_hunli/template/mobile/assets/images/8.lazy.png',
        success: () => {
          console.log('share success');
        },
        cancel: () => {
          console.log('share cancel');
        }
      };
      wx.onMenuShareTimeline(data);
      wx.onMenuShareAppMessage(data);
      wx.onMenuShareQQ(data);
      wx.onMenuShareWeibo(data);
      wx.onMenuShareQZone(data);
    });
  }
  // 创建初始随机评论
  private createRandomComponents() {
    localStorage.setItem('allComponents', JSON.stringify(this.allComponents));
    this.allComponents.map((res, index) => {
      if (index <= this.begin) {
        this.components.push(res);
      }
    });
  }

  createNextComponents(index: any) {
    this.begin++;
    this.components.indexOf(index);
    this.components.splice(index, 1);
    setTimeout(() => {
      if (this.begin < this.allComponents.length) {
        this.components.push(this.allComponents[this.begin]);
      } else {
        this.begin = 0;
        this.components.push(this.allComponents[this.begin]);
      }
    }, 600);
  }

  ngAfterViewInit() {
    this.audio.nativeElement.play();
  }

  switchPlay() {
    this.setAudioRandom();
    this.audio.nativeElement.play();
  }

  doSend() {
    const content = this.send.nativeElement.value;
    if (content.length < 3) {
      alert('太吝啬了吧,3个字都不给我!');
      return '';
    }
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

  confirmFuyue() {
    this.fuyueForm.openid = UserInfo.openid;
    this.fuyueForm.avatar = UserInfo.avatar;
    this.fuyueForm.nickname = UserInfo.nickname;
    this.fuyueForm.create_time = Math.floor(new Date().getTime() / 1000);
    this.fuyueForm.content = this.send.nativeElement.value;
    this.socket.emit('hunli.fuyue.add', this.fuyueForm);
    // 初始化
    this.hasFuyue = true;
    this.showFuyue = false;
    localStorage.setItem('hasFuyue', 'true');
    this.send.nativeElement.value = '';
  }

  cancelFuyue(e: any) {
    this.showFuyue = false;
  }
}
