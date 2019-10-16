<?php 
	header("content-type","text/html;charset=utf-8");
    //一、接收前端传来的数据
    $username = $_POST['username'];
    //二、保存数据

	//1、建立连接并选择数据库
    $con = mysql_connect("localhost","root","root");
    if(!$con){
        die("连接失败".mysql_error());
	}else{
        mysql_select_db("lk",$con);
        // 查询用户名是否存在
        $selectStr = "select * from reginfo
        where name='".$username."'";

        // 执行select语句
        $selectResult=mysql_query($selectStr,$con);

        // 是否有行数
        $result=mysql_num_rows($selectResult);

        // 关库
        mysql_close($con);
        
        // 判断数据库函数
        if($result==0){
            // 用户名可用
            echo "1";
        }else{
            // 用户名已被占用
            echo "0";
        }
    }
    
    

?>