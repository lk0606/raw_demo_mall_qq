//banner--------------简单轮播图
class Slide_Basic{
    //属性
constructor(obj){
    this.boxDom=obj.boxDom;
    this.width=obj.width;
    this.height=obj.height;
    this.imgs=obj.imgs;
    this.links=obj.links;
    this.btnColor=obj.btnColor;
    this.btnHighColor=obj.btnHighColor;
    this.timeSpace=obj.timeSpace;
    this.ord=0;
    this.timer=null;

    this.imgCssText=obj.imgCssText;
    this.ulCssText=obj.ulCssText;
    this.liCssText=obj.liCssText;
    this.createUI();
    this.slideAuto();
    this.createEvent();
}
//方法
//创建UI
createUI(){
    this.boxDom.style.position="relative";
    this.boxDom.style.cursor="pointer";
    //1.创建所有图片
    for(let i=0;i<this.imgs.length;i++){
        let imgDom=document.createElement("img");
        imgDom.src=this.imgs[i];
        imgDom.style.cssText=this.imgCssText;
        imgDom.style.position="absolute";
        // imgDom.style.zIndex="0";
        // imgDom.style.display="none";
        imgDom.style.left="0px";
        imgDom.style.top="0px";
        imgDom.style.width=this.width;
        imgDom.style.height=this.height;
        this.boxDom.appendChild(imgDom);
    }

    //2.创建豆豆
    let ulDom=document.createElement("ul");
    ulDom.style.cssText=this.ulCssText;
    ulDom.style.position="absolute";
    ulDom.style.listStyle="none";
    ulDom.style.zIndex="2";
    this.boxDom.appendChild(ulDom);
    for(let i=0;i<this.imgs.length;i++){
        let liDom=document.createElement("li");
        liDom.style.cssText=this.liCssText;
        liDom.style.float="left";
        liDom.style.backgroundColor= this.btnColor;
        ulDom.appendChild(liDom);
    }
    ulDom.children[0].style.backgroundColor = this.btnHighColor;
}		
createEvent(){
    this.boxDom.onmouseover=()=>{
        this.stopSlide();
    }
    this.boxDom.onmouseout=()=>{
        this.slideAuto();
    }
    let imgs =this.boxDom.getElementsByTagName("img");
    let lis =this.boxDom.getElementsByTagName("li");
    for(let i=0;i<lis.length;i++){
        lis[i].onmouseover=()=>{
            this.clickLiToImg(i);
        }
        imgs[i].onclick=()=>{
            this.link(i);
        }
    }
}
showImg(transOrd){
    //准备
    let imgs=this.boxDom.getElementsByTagName("img"); 
    for(let i=0;i<imgs.length;i++){
        imgs[i].style.display="none";
    }
    imgs[transOrd].style.display="block";
}
showLi(transOrd){
    let lis=this.boxDom.getElementsByTagName("li");
    for(let i=0;i<lis.length;i++){
        lis[i].style.backgroundColor=this.btnColor;
        lis[i].style.color=this.btnHighColor;
    }
    lis[transOrd].style.backgroundColor=this.btnHighColor;
    lis[transOrd].style.color=this.btnColor;
}
slideAuto(){
    this.timer=setInterval(()=>{
        this.ord++;
        if(this.ord>this.imgs.length-1){
            this.ord=0;
        }
        this.showImg(this.ord);
        this.showLi(this.ord);
    },this.timeSpace);
}
stopSlide(){
    window.clearInterval(this.timer);
}
clickLiToImg(transOrd){
    window.clearInterval(this.timer);
    this.ord=transOrd;
    this.showImg(this.ord);
    this.showLi(this.ord);
}
link(){
    let imgs=this.boxDom.getElementsByTagName("img");
        for(let i=0;i<imgs.length;i++){
            window.open(this.links[i]);
        }
    }
}