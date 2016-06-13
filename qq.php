<?php
header("Content-Type:text/html;charset=utf-8");  /* 定义编码为utf-8 */
$qqnum = "766464159";  /* 定义QQ号为766464159 */
$qqget = file_get_contents("http://base.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=$qqnum");  /* 获取JSON数据 */
$qqstr = iconv("gb2312","utf-8//IGNORE",$qqget);  /* 转换编码 */
$qqstr = mb_convert_encoding($qqget,"UTF-8","GBK");  /* 转换编码 */
$json = mb_substr(trim($qqstr),17,-1,"utf-8");  /* 截取指定内容 */
$jsonstr = json_decode($json,true);  /* 转换成PHP变量  */
$keys = array_keys($jsonstr);  /* 返回所有键名 */
$qq = $keys[0];  /* 取得第一个键名 */
$nick =$jsonstr[$qq][6];  /* 取值 */
$avatar =$jsonstr[$qq][0];  /* 取值 */
echo "<p>Q Q：$qq</p>";  /* 输出 QQ：766464159 */
echo "<p>昵称：$nick</p>";  /* 输出 昵称：麦田一根葱 */
echo '<p>头像：<img src="http://img.2333.me/src/'.$avatar.'" /></p>';  /* 输出头像 */
?>