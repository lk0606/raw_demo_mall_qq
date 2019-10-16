$(document).ready(function(){
    
    // 表单验证
    // 用户名
    $("#nickname").blur(function(){
       
        if($(this).val()==""){
            $(".nickname-right").hide();
            $(this).css("border","1px solid #ff5b5b");
            $(".nickname-null").slideDown(40);
        }
        else if(!fromValidation($(this).val(),"userName")){
            $(this).css("border","1px solid #ff5b5b");
        }
        else{
            // Ajax异步请求服务器
            let name=$("#nickname").val();
            $.ajax({
                type: "POST",
                url:"php/checkreg.php",
                data:"username="+name,
                success: function(msg){
                    console.log(msg);
                    if(msg=="1"){
                        console.log('用户名可用！！！');
            //             // 前台显示
            //         // 昵称合法
                    $(".nickname-null").slideUp(40);        //警告收起
                    $(".nickname-right").show();
                    }else if(msg=="0"){
                        console.log('用户名已存在！！！');
                       
                    }
                }
            });
            
        }

    }); 
    // 昵称聚焦清除警告
    $("#nickname").focus(function(){
        $(this).css("border","1px solid #549df8");
        $(".nickname-null").slideUp(40);
    });
    
    // 判断密码正确性图标-------密码框获得焦点-------
    $("#password").focus(function(){
        
        $(this).css("border","1px solid #549df8");
        $(".password-right").slideUp(40);
        
        $(".close").removeClass("eyepol");

        // 清除空聚焦
        $(".password-null,.password-nbsp,.password-length,.password-type").slideUp(40);
        
        // 聚焦提示
        $(".word-nbsp,.word-length,.word-type").slideDown(40);
        
        // 判断眼睛出现时机
        $("#password").keyup(function(){

            if($("#password").val()!=""){

                $(".close").css({
                    display:"block"
                });
            // 密码合法性提示
                wordKeyUp();
            }
            else{
                $(".close").removeClass("eyepol");
                $(".close").css({
                    display:"none"
                }); 
                // 初始化
                $(".nbsp-pic").attr("src","img-reg/green.png");
                $(".length-pic,.word-type").attr("src","img-reg/info.png");
            }
        }); 
        
    });

    // 长按显示密码   mousedown
    $(".close").mousedown(function(e){
        if ( e && e.preventDefault ) 
	            e.preventDefault(); 
	        //IE阻止默认事件
	        else {
	            window.event.returnValue = false; 
            return false;
        }
        $(this).attr("src","img-reg/eye.png");
        $("#password")[0].type="text";
    });

    $(".close").mouseup(function(){
        $(this).attr("src","img-reg/eye-close.png");
        $("#password")[0].type="password";
    });

    // 密码
    $("#password").blur(function(){

        // 失去焦点隐藏提示
        $(".word-nbsp,.word-length,.word-type").slideUp(40);
        
        // 空警告
        if($(this).val()==""){
            $(this).css("border","1px solid #ff5b5b");
            $(".password-right").css({
                display:"none"
            }); 
            $(".password-null").slideDown(40);
        }
        // 不合法详细提示
        else if($(this).val()!=""){
            // 密码不合法警告
            // $(".password-right").css({
            //     display:"none"
            // });
            wordBlur();
            $(this).css("border","1px solid #ff5b5b");
        
            // 密码合法蓝色框框
            if(fromValidation($(this).val(),"password")){
                
                $("#password").css("border","1px solid #549df8"); 
                $(".close").addClass("eyepol");
                $(".password-null").slideUp(40);
                $(".password-right").css({
                    display:"block"
                }); 
            }
        } 
    }); 
    
// phone----------------------
    // +86
    $("#area-num").focus(function(){
        $(".down").hide();
        $(".up").show();
    });     
    $("#area-num").blur(function(){
        $(".down").show();
        $(".up").hide();
    }); 
    
    $(".arrows").click(function(){
        if($(".down").is(":visible")){
            $(".down").hide();
            $(".up").show();
        }
        else if($(".up").is(":visible")){
            $(".up").hide();
            $(".down").show();
        }
    });     
// 勾选
    $(".qzone,.qzone-p").on("click",function(){
        if($(".checked-qzone").is(":hidden")){
            $(".checked-qzone").show();
            $(".check-qzone").hide();
        }
        else{
            $(".checked-qzone").hide();
            $(".check-qzone").show();
        }
    });
    $(".yes,.yes-p").on("click",function(){
        if($(".checked-yes").is(":hidden")){
            $(".checked-yes").show();
            $(".check-yes").hide();
        }
        else{
            $(".checked-yes").hide();
            $(".check-yes").show();
        }
    });
});