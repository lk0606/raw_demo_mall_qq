

function getStyle(domObj,attr){
	//if(window.navigator.userArgent.indexOf("")){
	if(domObj.currentStyle){
		return domObj.currentStyle[attr];
	}else{
		//return window.getComputedStyle(domObj)[attr];
		var obj  = window.getComputedStyle(domObj);
		return obj[attr];
	}
}

let bigMirrorSingleton =(function(){
	let instance;

	function BigMirror(obj){
	    //把初始dom置为空
		this.boxDom = null;
		this.mirrorDom = null;
		this.showDom = null;
		
		//一、数据
		//初始化跟样式有关的数据
		this.initData();
		//把传入的数据赋给对象
		for(let key in obj){
			this[key] = obj[key];
		}
		//二、外观
		//创建HTML元素
		this.createUI();
		//根据上面的数据修改HTML元素的样式属性
		this.updateUI();
		//添加事件
		this.addEvent();
	}
	
	BigMirror.prototype.initData = function(){
		this.width = 50;
		this.height = 50;
		this.left = 0;
		this.top = 0;
		this.opacity = 0.5;
		this.bgColor = "pink";
		this.multiple = 3;//默认3倍；
		this.direction = "右";
		this.border="1px solid red;"
	}
	
	//创建放大镜的div和显示效果的div
	BigMirror.prototype.createUI = function(){
		this.mirrorDom = document.createElement("div");
		this.mirrorDom.style.cssText = 	"position:absolute;display:none;";
		this.showDom = document.createElement("div");
		this.showDom.style.cssText="position:absolute;display:none;";
	}
	
	//改变放大镜的div和显示效果的div的属性和父元素。
	BigMirror.prototype.updateUI = function(){
		this.mirrorDom.style.display = "block";
		this.mirrorDom.style.left = this.left+"px";
		this.mirrorDom.style.top = this.top+"px";
		this.mirrorDom.style.width = this.width+"px";
		this.mirrorDom.style.height = this.height+"px";
		this.mirrorDom.style.backgroundColor = this.bgColor;
		this.mirrorDom.style.opacity = this.opacity;
		this.mirrorDom.style.border= this.border;
		this.boxDom.appendChild(this.mirrorDom);
		
		let left1  = this.left;
		let top1 = this.top;
		switch(this.direction){
			case "右":	left1 = this.boxDom.offsetWidth;
						break;
			//自己加的 
			case "左":	left1 = -1*this.boxDom.offsetWidth;
						break;			
			case "下":	top1 = this.boxDom.offsetHeight;
						break;
			// 自己加的
			case "上":	top1 = -1*this.boxDom.offsetHeight;
						break;	
			// 自己加的
			case "原图":	top1 = 0;
						break;		
			default:;break;
		}
		this.showDom.style.left = left1+"px";
		this.showDom.style.top = top1+"px";
		
		this.showDom.style.display = "block";
		this.showDom.style.width = (this.width*4*this.multiple)+"px";
		this.showDom.style.height = (this.height*4*this.multiple)+"px";
		this.showDom.style.backgroundColor = this.bgColor;
		this.showDom.style.backgroundImage = getStyle(this.boxDom,"backgroundImage");
		this.showDom.style.backgroundSize = (this.boxDom.offsetWidth*this.multiple)+"px "+(this.boxDom.offsetHeight*this.multiple)+"px";
		this.boxDom.appendChild(this.showDom);
	}
	
	//添加事件
	BigMirror.prototype.addEvent = function(){
		this.boxDom.addEventListener("mouseout",this.outEvent,false);
		this.boxDom.addEventListener("mousemove",this.moveEvent,false);
	}

	BigMirror.prototype.outEvent = ()=>{
		// console.log("outEvent");		
		instance.mirrorDom.style.display  ="none";
		instance.showDom.style.display  ="none";
		instance.boxDom.removeEventListener("mouseout",this.outEvent,false);
		instance.boxDom.removeEventListener("mousemove",this.moveEvent,false);
	}
	
	BigMirror.prototype.moveEvent = (event)=>{
		// console.log("moveEvent");		
		let evt = event || window.event;
		//1、数据
		instance.left = evt.pageX-instance.boxDom.offsetLeft-instance.width/2;
		instance.top = evt.pageY-instance.boxDom.offsetTop-instance.height/2;
		
		if(instance.left<0){
			instance.left=0;
		}else if(instance.left>instance.boxDom.offsetWidth-instance.width){
			instance.left=instance.boxDom.offsetWidth-instance.width;
		}
		if(instance.top<0){
			instance.top=0;
		}else if(instance.top>instance.boxDom.offsetHeight-instance.height){
			instance.top=instance.boxDom.offsetHeight-instance.height;
		}
		
		//2、外观
		// console.log(instance);
		// console.log(instance.mirrorDom);
		instance.mirrorDom.style.left = instance.left+"px";
		instance.mirrorDom.style.top = instance.top+"px";
		instance.showDom.style.backgroundPosition = (-1*instance.left*instance.multiple)+"px "+(-1*instance.top*instance.multiple)+"px";
		
	}
		
	return {
			getInstance:function(obj){
				if(instance==undefined){
					instance = new BigMirror(obj);
				}else{
					//一、数据
					//初始化跟样式有关的数据
					instance.initData();
					//把传入的数据赋给对象
					for(let key in obj){
						instance[key] = obj[key];
					}
					//二、外观
					//根据上面的数据修改HTML元素的样式属性
					instance.updateUI();
					//添加事件
					instance.addEvent();
				}
			}
	}
})();

	
