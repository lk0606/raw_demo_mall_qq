// 无缝滚动轮播图插件
function Slide_Marquee(obj){
	this.boxDom = obj.boxDom;//轮播图所在容器
	this.width = obj.width;
	this.height = obj.height;
	this.imgs= obj.imgs;//图片路径数组
	this.links= obj.links;//链接数组
	this.timeSpace = obj.timeSpace;//一张图片的时长
	this.imgBoxLeft=0;

	this.imgCssText=obj.imgCssText;
	this.ulCssText=obj.ulCssText;
	this.liCssText=obj.liCssText;
	this.btnColor = obj.btnColor;//每个豆豆的原始颜色
	this.btnHighColor = obj.btnHighColor;//每个豆豆的高亮颜色
	this.timer = null;
	this.imgBox=null;
	this.createUI();
	this.changeImg();
	this.createEvent();
}
Slide_Marquee.prototype.createUI=function(){
	this.boxDom.style.position="relative";
	this.boxDom.style.cursor="pointer";
	// this.boxDom.style.overflow="hidden";
	//创建imgBox
	this.imgBox=document.createElement("div");
	this.imgBox.style.width=this.width*(this.imgs.length)+"px";
	this.imgBox.height=this.height+"px";
	this.imgBox.style.position="absolute";
	this.imgBox.style.top="0px";
	this.imgBox.style.left="0px";
	this.boxDom.appendChild(this.imgBox);
	//1.创建所有图片
	for(let i=0;i<this.imgs.length;i++){
		let imgdom=document.createElement("img");
		imgdom.src=this.imgs[i];
		imgdom.style.cssText=this.imgCssText;
		imgdom.style.float="left";
		imgdom.style.width=this.width+"px";
		imgdom.style.height=this.height+"px";
		this.imgBox.appendChild(imgdom);
	}
	this.imgBox.children[0].style.left="0px";

	//2.创建豆豆
	let ulDom=document.createElement("ul");
	ulDom.style.cssText=this.ulCssText;
	ulDom.style.position="absolute";
	ulDom.style.bottom="0px";
	ulDom.style.right="0px";
	ulDom.style.listStyle="none";
	ulDom.style.zIndex="2";
	this.boxDom.appendChild(ulDom);
	for(let i=0;i<this.imgs.length-1;i++){
		let liDom=document.createElement("li");
		liDom.style.cssText=this.liCssText;
		liDom.style.float="left";
		liDom.style.backgroundColor=this.btnColor;
		ulDom.appendChild(liDom);
	}
	ulDom.children[0].style.backgroundColor=this.btnHighColor;
}
Slide_Marquee.prototype.createEvent=function(){
	this.boxDom.onmouseover=()=>{
		this.stopChange();
	};
	this.boxDom.onmouseout=()=>{
		this.changeImg();
	};
	let imgs=this.imgBox.getElementsByTagName("img");
	let lis=this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].onclick=()=>{
			this.clickImg(i);
		}
		imgs[i].onclick=()=>{
			this.link(i);
		}
	}
}
//顺序显示图片
Slide_Marquee.prototype.orderShowImg=function(){
	//1.准备工作
	if(this.imgBoxLeft<=-1*this.width*(this.imgs.length-1)){
		this.imgBoxLeft=0;
	}
	//每次从0到-500;(this.width)
	let left=0;//控制定时器停止的数据
	//2.开始滑入画出
	let innerTimer=setInterval(()=>{
		//1.改数据
		left=left-10;
		this.imgBoxLeft=this.imgBoxLeft-10;
		//2.边界
		if(left<=-1*this.width){
			left=-1*this.width
			window.clearInterval(innerTimer);
		}
		//3.该外观
		this.imgBox.style.left=this.imgBoxLeft+"px";
	},10)
}
//2.改变豆豆颜色
Slide_Marquee.prototype.changeLis=function(transOrd){
	let lis = this.boxDom.getElementsByTagName("li");
	for(let i=0;i<lis.length;i++){
		lis[i].style.backgroundColor=this.btnColor;
	}
		lis[transOrd].style.backgroundColor=this.btnHighColor;
}
//改变图片和豆豆颜色

let ord = 0;
Slide_Marquee.prototype.changeImg=function(){
	this.timer = setInterval(()=>{
		//1.改变数据
		ord++;
		//2、处理边界
		if(ord>this.imgs.length-2){
			ord=0;
		}
		//3、改变外观
		//1）、显示指定的图片
		this.orderShowImg(ord);
		//2)、改变指定豆豆的颜色
		this.changeLis(ord);
	},this.timeSpace);
}


//停止
Slide_Marquee.prototype.stopChange=function(){
	window.clearInterval(this.timer);
}
//点击豆豆跳转图片
Slide_Marquee.prototype.clickImg=function(transOrd){
	window.clearInterval(this.timer);
	let outOrd = ord;
	ord=transOrd;
	if(outOrd==ord){
		return;
	}
	//2、改变外观
	//1）、显示指定的图片
	this.fadeImg(outOrd,ord);	
	//2)、改变指定豆豆的颜色
	this.changeLis(ord);	
		
}

//1.滑图片
Slide_Marquee.prototype.fadeImg=function(outOrd,ord){
	//准备工作
	if(this.imgBoxLeft<=-1*this.width*(this.imgs.length-1)){
		this.imgBoxLeft=0;
	}
	//最终的left值
	console.log(outOrd,ord);
	let endLeft=Math.abs(outOrd-ord)*this.width;	
	let direction=outOrd<ord?-1:1;
	//步长
	let timeSpace=10;
	let inc=endLeft/(300/timeSpace);
	//每次都是从0到（）
	let left=0;//控制定时器
	//2.开始滑
	let timer = setInterval(()=>{
		
		//1、改变数据		
		left = left+direction*inc;
		this.imgBoxLeft = this.imgBoxLeft+direction*inc;
		
		//2、处理边界
		if(Math.abs(Math.abs(left)-endLeft)<=inc){//最后一步
			left=endLeft;
			this.imgBoxLeft = -1*ord*this.width;
			window.clearInterval(timer);
		}
		//3、改变外观
		this.imgBox.style.left = this.imgBoxLeft+"px";
	},timeSpace);
}
//超链
Slide_Marquee.prototype.link=function(){
	let imgs=this.boxDom.getElementsByTagName("img");
		for(let i=0;i<imgs.length-1;i++){
			window.open(this.links[i]);
		}
}