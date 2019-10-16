
<?php
    header("content-type","text/html;charset=utf-8");

    //一、接收前端传来的数据
    // $username = $_GET['username'];
    // $password = $_GET['password'];

    // post
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    //二、保存数据

	//1、建立连接并选择数据库
    $con = mysql_connect("localhost","root","root");
    if(!$con){
        die("连接失败".mysql_error());
        // echo "0";
	}else{

        mysql_select_db("lk",$con);

        // 查询用户名是否存在
        $selectStr = "select * from reginfo
        where name=".$username."";

        // 执行select语句
        $selectResult=mysql_query($selectStr,$con);

        // 是否有行数
        $result=mysql_num_rows($selectResult);
        
        // 插入
        $insertStr="insert into reginfo(name,pass)
        values('".$username."','".$password."')";

        // if(mysql_num_rows(mysql_query($selectStr))==0){
            if($result==0){
            echo "1";
            // 用户名未占用就插入
            mysql_query($insertStr,$con);
            mysql_close($con);
        }else{
            // 用户名已被占用
            echo "0";
        }
    }

?>