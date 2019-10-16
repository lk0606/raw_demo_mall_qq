
//左上角滚动
let ord=0;
let lis=document.getElementById("hd-notice").children;
let timer=null;
function initUI(){
    for(let i=0;i<lis.length;i++){
        lis[i].style.top="30px";
    }
    lis[0].style.top="0px";
}
function go(outOrd,inOrd){
    //1.准备滑
    lis[inOrd].style.top="30px";
    //2.开始滑
    let top=0;
    
    let timer1=setInterval(function(){
        //1.改数据
        top-=0.24;
        //2.处理边界
        if(top<=-30){
            top=-30;
            window.clearInterval(timer1);
        }
        lis[outOrd].style.top=top+"px"; 
		lis[inOrd].style.top=top+30+"px"; 	
    },5);
}
function changeli(){
    timer=setInterval(function(){
        let outOrd=ord;
        ord++;
        if(ord>lis.length-1){
            ord=0;
        }
        go(outOrd,ord);
    },2000);
}
function roll(){
    initUI();
    changeli();
    document.getElementById("hd-notice").onmouseover=function(){
        window.clearInterval(timer);
    }
    document.getElementById("hd-notice").onmouseout=function(){
        changeli();
    }
}
//----------------------------

