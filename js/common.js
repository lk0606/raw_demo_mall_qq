// javascript document
//获取
function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else if(str.charAt(0)=="*"){
		return document.getElementsByName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	
//rgba
function randomRGBA(){
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    var a = Math.random();
    return 'rgb('+r+','+g+','+b+','+a+')';
}
//rgb
function randomColor(){
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';
}
function $create(tagName){
	return document.createElement(tagName);
}