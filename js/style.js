// javascript document

//获取某个DOM对象的样式属性(兼容性函数)
//参数：
//DOM对象
//样式属性名
//返回值：就是样式属性值
//1. getStyle
function getStyle(domObj,attr){

	//if(window.navigator.userArgent.indexOf("")){
	if(domObj.currentStyle){
		return domObj.currentStyle[attr];
	}
	else{
		//return window.getComputedStyle(domObj)[attr];
		let obj  = window.getComputedStyle(domObj);
		return obj[attr];
	}
}
// 函数功能：批量更改DOM元素的css样式
// 参数：DOM数组，样式属性名，属性值
// 返回值：无
function changeCss(arrDom,styName,styValue){
	for(let i in arrDom){ 
		arrDom[i].style[styName] = styValue; 
	} 
} 