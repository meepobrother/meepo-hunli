/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var $: any;
declare var UserInfo: {
  openid: string;
  avatar: string;
}