function fromValidation(str,type){
    switch(type){
        //用户名：（英文字母、数字、下划线组合，长度1-24位，且只能以字母开头）
        case "userName":var reg=/\w{2,}/;break;
        //密码：（不包含空格，字母数字和特殊字符必须包含两种，长度8-16位）
        case "password":var reg=/^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/;break;
        // case "password":var reg=/(?!^[a-z]*$)(?!^[A-Z]*$)(?!^[0-9]*$)(?!^[_\W]*$)^[a-zA-Z0-9].{8,16}$/;break;
        //电话号码
		case "phone":var reg = /^1[3-9]\d{9}$/;break;
        default:;
    }
    return reg.test(str);
}
function wordKeyUp(){
    // let nbsp=/\S*/;
    let wordType=/^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S/;
    // 没空格
    if($("#password").val().search(" ")==-1){
        $(".nbsp-pic").attr("src","img-reg/green.png"); 
    }
    // 没空格
    else{
        $(".nbsp-pic").attr("src","img-reg/info.png");
    }
    // 8-16
    if($("#password").val().length>=8 && $         ("#password").val().length<=16){
        $(".length-pic").attr("src","img-reg/green.png"); 
    }
    else{
        $(".length-pic").attr("src","img-reg/info.png");
    }
    // 两种以上类型
    if(wordType.test($("#password").val())==true){
        $(".word-type").attr("src","img-reg/green.png"); 
    }
    else{
        $(".word-type").attr("src","img-reg/info.png");
    }
    
}
function wordBlur(){
    let nbsp=/^\S*$/;
    let wordType=/^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/;

    if($("#password").val().search(nbsp)==-1){
        $(".password-nbsp").slideDown(40); 
    }
    else if($("#password").val().length<8){
        $(".password-length").slideDown(40);
    }
    else if(wordType.test($("#password").val())==false){
        $(".password-type").slideDown(40);
    }
}
