<?php
/**
 * 婚礼邀请函模块微站定义
 *
 * @author imeepos
 * @url
 */
defined('IN_IA') or exit('Access Denied');

class Meepo_hunliModuleSite extends WeModuleSite
{

    public function doMobileIndex()
    {
        global $_W, $_GPC;
        $userinfo = mc_oauth_userinfo();
        $avatar = $userinfo['avatar'];
        preg_match("/.*?\/(132132)/", $avatar, $maches);
        $avatar = str_replace($maches[1], '132', $avatar);
        $userinfo['avatar'] = $avatar;
        $url = $this->getRealUrl();
        if ($url !== $_W['siteurl']) {
            header("location:" . $url);
            exit();
        }
        include $this->template('index');
    }

    public function doWebIndex()
    {
        global $_W, $_GPC;
        include $this->template('index');
    }

    public function doMobileUpdate()
    {

    }

    public function getRealUrl()
    {
        $protocol = (!empty($_SERVER[HTTPS]) && $_SERVER[HTTPS] !== off || $_SERVER[SERVER_PORT] == 443) ? "https://" : "http://";
        $url = $protocol . $_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI];
        preg_match("/.*?(\&from=.*)/", $url, $maches);
        $url = str_replace($maches[1], '', $url);
        return $url;
    }

}
