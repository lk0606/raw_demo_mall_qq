
//1.滑动轮播图插件
function Slide_Translate(obj){
    this.boxDom = obj.boxDom;//轮播图所在容器
	this.width = obj.width;
	this.height = obj.height;
	this.imgs= obj.imgs;//图片路径数组
	this.ord = 0;//轮播图当前的图片序号	
	this.timeSpace = obj.timeSpace;//一张图片的时长

	this.imgCssText=obj.imgCssText;
	this.ulCssText=obj.ulCssText;
	this.liCssText=obj.liCssText;
	this.btnColor = obj.btnColor;//每个豆豆的原始颜色
	this.btnHighColor = obj.btnHighColor;//每个豆豆的高亮颜色
	this.timer = null;
	// this.initUI();
	this.createUI();
	this.changeImg();
	this.createEvent();
}
Slide_Translate.prototype.createUI=function(){
	this.boxDom.style.position="relative";
	this.boxDom.style.overflow="hidden";
	//1.创建所有图片
	for(let i=0;i<this.imgs.length;i++){
		let imgdom=document.createElement("img");
		imgdom.src=this.imgs[i];
		imgdom.style.cssText=this.imgCssText;
		imgdom.style.position="absolute";
		imgdom.style.top="0px";
		imgdom.style.zIndex="0";
		imgdom.style.left=this.width+"px";
		imgdom.style.width=this.width+"px";
		imgdom.style.height=this.height+"px";
		this.boxDom.appendChild(imgdom);
	}
	this.boxDom.children[0].style.left="0px";

	//2.创建豆豆
	let ulDom=document.createElement("ul");
	ulDom.style.cssText=this.ulCssText;
	ulDom.style.position="absolute";
	ulDom.style.bottom="0px";
	ulDom.style.right="0px";
	ulDom.style.listStyle="none";
	ulDom.style.zIndex="2";
	this.boxDom.appendChild(ulDom);
	for(let i=0;i<this.imgs.length;i++){
		let liDom=document.createElement("li");
		liDom.style.cssText=this.liCssText;
		liDom.style.float="left";
		liDom.style.backgroundColor=this.btnColor;
		ulDom.appendChild(liDom);
	}
	ulDom.children[0].style.backgroundColor=this.btnHighColor;
}
Slide_Translate.prototype.createEvent=function(){
	this.boxDom.onmouseover=()=>{
		this.stopChange();
	};
	this.boxDom.onmouseout=()=>{
		this.changeImg();
	};
	let lis=this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].onclick=()=>{
			this.clickImg(i);
		}
	}
}
//改变图片和豆豆颜色
Slide_Translate.prototype.changeImg=function(){
	this.timer = setInterval(()=>{
		//1.改变数据
		let outOrd=this.ord;//
		this.ord++;
		//2、处理边界
		if(this.ord>this.imgs.length-1){
			this.ord=0;
		}
		//3、改变外观
		//1）、显示指定的图片
		this.fadeImg(outOrd,this.ord);
		//2)、改变指定豆豆的颜色
		this.changeLis(this.ord);
	},this.timeSpace);
}
//1.滑图片
Slide_Translate.prototype.fadeImg=function(outOrd,inOrd){
	//1.准备滑
	let imgDoms=this.boxDom.getElementsByTagName("img");
	// if(imgDoms[outOrd].style.left=="0px"){
		imgDoms[inOrd].style.left=this.width+"px";
		//2.开始滑
		let left=0;
		let moveTimer=setInterval(()=>{
			//1.改变数据
			left=left-5;
			//2.处理边界
			if(left<=-1*this.width){
				left=-1*this.width;
				window.clearInterval(moveTimer);
			}
			//3.改变外观
			imgDoms[outOrd].style.left=left+"px"; 
			imgDoms[inOrd].style.left=(left+this.width)+"px"; 		
		},10);	
	// }
}
//2.改变豆豆颜色
Slide_Translate.prototype.changeLis=function(transOrd){
	let lis = this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].style.backgroundColor=this.btnColor;
	}
		lis[transOrd].style.backgroundColor=this.btnHighColor;
}
//停止
Slide_Translate.prototype.stopChange=function(){
	window.clearInterval(this.timer);
}
//点击豆豆跳转图片
Slide_Translate.prototype.clickImg=function(transOrd){
	window.clearInterval(this.timer);
	let outOrd = this.ord;
	this.ord=transOrd;
	if(outOrd==this.ord){
		return;
	}
	//2、改变外观
	//1）、显示指定的图片
	this.fadeImg(outOrd,this.ord);	
	//2)、改变指定豆豆的颜色
	this.changeLis(this.ord);			
}
	//超链
		// let imgs=getElementsByTagName("img");
		// for(let i=0;i<imgs.length;i++){
		// 	imgs[i].onclick=function(){
		// 		location.href=arr[i];
		// 	}
		// }
//简单轮播图
class Slide_Basic{
		//属性
	constructor(obj){
		this.boxDom=obj.boxDom;
		this.width=obj.width;
		this.height=obj.height;
		this.imgs=obj.imgs;
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
		//1.创建所有图片
		for(let i=0;i<this.imgs.length;i++){
			let imgDom=document.createElement("img");
			imgDom.src=this.imgs[i];
			imgDom.style.cssText=this.imgCssText;
			imgDom.style.position="absolute";
			imgDom.style.zIndex="0";
			imgDom.style.left="0px";
			imgDom.style.top="0px";
			imgDom.style.width=this.width+"px";
			imgDom.style.height=this.height+"px";
			this.boxDom.appendChild(imgDom);
		}
		//this.boxDom.children[0].style.left="0px";
	
		//2.创建豆豆
		let ulDom=document.createElement("ul");
		ulDom.style.cssText=this.ulCssText;
		ulDom.style.position="absolute";
		ulDom.style.listStyle="none";
		ulDom.style.zIndex="2";
		ulDom.style.right="200px";
		ulDom.style.bottom="6px";
		this.boxDom.appendChild(ulDom);
		for(let i=0;i<this.imgs.length;i++){
			let liDom=document.createElement("li");
			liDom.style.cssText=this.liCssText;
			liDom.style.marginLeft="5px";
			liDom.style.float="left";
			liDom.style.backgroundColor= this.btnColor;
			ulDom.appendChild(liDom);
		}
		ulDom.children[0].style.backgroundColor = this.btnHighColor;
	}		
	createEvent(){
		let obj=this;
		this.boxDom.onmouseover=function(){
			obj.stopSlide();
		}
		this.boxDom.onmouseout=function(){
			obj.slideAuto();
		}
		let lis =this.boxDom.getElementsByTagName("li");
		for(let i=0;i<lis.length;i++){
			lis[i].onclick=function(){
				obj.clickLiToImg(i);
			}
		}
	}
	showImg(transOrd){
		//准备
		let imgs=this.boxDom.getElementsByTagName("img"); 
		for(let i=0;i<imgs.length;i++){
			imgs[i].style.zIndex=0;
		}
		imgs[transOrd].style.zIndex=1;
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
}
//淡轮播图插件
function Slide_Fade(obj){
    this.boxDom = obj.boxDom;//轮播图所在容器
	this.width = obj.width;
	this.height = obj.height;
	this.imgs= obj.imgs;//图片路径数组
	this.ord = 0;//轮播图当前的图片序号	
	this.timeSpace = obj.timeSpace;//一张图片的时长

	this.imgCssText=obj.imgCssText;
	this.ulCssText=obj.ulCssText;
	this.liCssText=obj.liCssText;
	this.btnColor = obj.btnColor;//每个豆豆的原始颜色
	this.btnHighColor = obj.btnHighColor;//每个豆豆的高亮颜色
	this.timer = null;
	// this.initUI();
	this.createUI();
	this.changeImg();
	this.createEvent();
}
Slide_Fade.prototype.createUI=function(){
	this.boxDom.style.position="relative";
	this.boxDom.style.overflow="hidden";
	//1.创建所有图片
	for(let i=0;i<this.imgs.length;i++){
		let imgdom=document.createElement("img");
		imgdom.src=this.imgs[i];
		imgdom.style.cssText=this.imgCssText;
		imgdom.style.position="absolute";
		imgdom.style.top="0px";
		imgdom.style.zIndex="0";
		imgdom.style.width=this.width+"px";
		imgdom.style.height=this.height+"px";
		this.boxDom.appendChild(imgdom);
	}
	this.boxDom.children[0].style.zIndex=1;

	//2.创建豆豆
	let ulDom=document.createElement("ul");
	ulDom.style.cssText=this.ulCssText;
	ulDom.style.position="absolute";
	ulDom.style.bottom="0px";
	ulDom.style.right="0px";
	ulDom.style.listStyle="none";
	ulDom.style.zIndex="2";
	this.boxDom.appendChild(ulDom);
	for(let i=0;i<this.imgs.length;i++){
		let liDom=document.createElement("li");
		liDom.style.cssText=this.liCssText;
		liDom.style.float="left";
		liDom.style.backgroundColor=this.btnColor;
		ulDom.appendChild(liDom);
	}
	ulDom.children[0].style.backgroundColor=this.btnHighColor;
}
Slide_Fade.prototype.createEvent=function(){
	this.boxDom.onmouseover=()=>{
		this.stopChange();
	};
	this.boxDom.onmouseout=()=>{
		this.changeImg();
	};
	let lis=this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].onclick=()=>{
			this.clickImg(i);
		}
	}
}
//改变图片和豆豆颜色
Slide_Fade.prototype.changeImg=function(){
	this.timer = setInterval(()=>{
		//1.改变数据
		let outOrd=this.ord;//
		this.ord++;
		//2、处理边界
		if(this.ord>this.imgs.length-1){
			this.ord=0;
		}
		//3、改变外观
		//1）、显示指定的图片
		this.fadeImg(outOrd,this.ord);
		//2)、改变指定豆豆的颜色
		this.changeLis(this.ord);
	},this.timeSpace);
}
//1.滑图片
Slide_Fade.prototype.fadeImg=function(outOrd,inOrd){
	//1.准备淡入淡出
	let imgDoms=this.boxDom.getElementsByTagName("img");
	for(let i=0;i<imgDoms.length;i++){
		imgDoms[i].style.zIndex=0;
		//BUG解决
		imgDoms[i].style.display = "none";
	}	
		//BUG解决
		imgDoms[outOrd].style.display = "block";
		imgDoms[inOrd].style.display = "block";
		imgDoms[outOrd].style.zIndex=2; 
		imgDoms[inOrd].style.zIndex=1; 
	//2.开始滑
	let opacity=0;	
	let moveTimer=setInterval(function(){
		//1.改变数据
		opacity=opacity+0.05;
		//2.处理边界
		if(opacity>=1){
			opacity=1;
			window.clearInterval(moveTimer);
		}
		//3.改变外观
		imgDoms[outOrd].style.opacity=1-opacity; 
		imgDoms[inOrd].style.opacity=opacity;
	},50);	
}
//2.改变豆豆颜色
Slide_Fade.prototype.changeLis=function(transOrd){
	let lis = this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].style.backgroundColor=this.btnColor;
	}
		lis[transOrd].style.backgroundColor=this.btnHighColor;
}
//停止
Slide_Fade.prototype.stopChange=function(){
	window.clearInterval(this.timer);
}
//点击豆豆跳转图片
Slide_Fade.prototype.clickImg=function(transOrd){
	window.clearInterval(this.timer);
	let outOrd = this.ord;
	this.ord=transOrd;
	if(outOrd==this.ord){
		return;
	}
	//2、改变外观
	//1）、显示指定的图片
	this.fadeImg(outOrd,this.ord);	
	//2)、改变指定豆豆的颜色
	this.changeLis(this.ord);			
}
