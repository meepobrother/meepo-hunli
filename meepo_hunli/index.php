<?php
global $_W;
include "../../framework/bootstrap.inc.php";
$sql = "SELECT * FROM " . tablename("mc_mapping_fans") . " WHERE uniacid=2  ORDER BY rand() limit 30";
$list = pdo_fetchall($sql, array());

$account_api = WeAccount::create(2);
load()->model('mc');

$randomContents = [
    '恭喜发财',
    '新婚大吉',
    '新娘漂亮啊',
    '牛逼了',
    '飞起飞起',
    '明哥带我飞',
    '必须亲临',
    '人生啊',
    '羡慕嫉妒',
    '新婚愉快',
    '明总霸气',
    '姐姐好漂亮',
    '姐姐想赵丽颖啊',
    '赵丽颖',
    '哈哈哈，有才',
    '红包拿来',
    '吸气洋洋',
    '发红包',
    '天下竟有如此美人',
    '霸气不解释',
    '背景不错',
    '这发型亮了',
    '德信智能家具贺!',
    '恩爱到白头',
    '放开那姑娘!',
    '永结同心!',
    '好好好',
    '胜记科技前来恭贺!',
    '放开那姑娘+1',
    '放开那姑娘+1',
];

$fanss = array();

foreach ($list as $key=>$li) {
    $userinfo = mc_fansinfo($li['openid']);
    $data = array();
    $data['content'] = $randomContents[$key];
    $data['avatar'] = $userinfo['avatar'];
    $data['create_time'] = time();
    $data['openid'] = $_W['openid'];
    pdo_insert('imeepos_hunli_discuss',$data);
    $fanss[] = $data;
}

die(json_encode($fanss));
