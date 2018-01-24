/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var $: any;
declare var UserInfo: {
  openid: string;
  avatar: string;
  nickname: string;
}

declare var wx: any;
declare interface jssdkconfig {
  appId: string;
  nonceStr: string;
  timestamp: number;
  signature: string;
  debug: boolean;
  jsApiList: string[];
}
declare var jssdkconfig: jssdkconfig;
declare interface sysinfo {
  siteurl: string;
  uniacid: number;
  acid: number;
  siteroot: string;
  attachurl: string;
  MODULE_URL: string;
}
declare var sysinfo: sysinfo;