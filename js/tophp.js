function clickCheckReg(){
    let name=$("#nickname").val();
    let pass=$("#password").val();
    if($(".nickname-right").is(":visible") && $(".checked-yes").is(":visible")){
        // $("#reg")[0].disabled="false";
        $.ajax({
            type: "POST",
            url: "php/reg.php",
            dataType:"json",
            data:{username:name,
                password:pass
            },
            success: function(msg){
             if(msg=="1"){
                 alert("亲，注册成功");
             }
            }
         });
    }else{
        // $("#reg").style.border="3px solid black";
        // $("#reg")[0].disabled="true";
        alert("亲，输入有误");
    }
}