/**
 * Created by Administrator on 2017/3/9.
 */
//重写indexOf() -- indexOf()方法返回在该数组中第一个找到的元素位置，如果它不存在则返回-1。
//array.indexOf(searchElement[, fromIndex = 0]) searchElement // 位于数组中的元素； fromIndex // 开始查找指定元素的索引值，默认值为 0 (即在整个数组中查找指定元素)；
'use strict';
Array.prototype.TindexOf=function(query){
    var index=-1,arr=this,len=arr.length;
    var startSearchIndex=Number(arguments[1])||0;
    if(startSearchIndex<0){
        startSearchIndex+=len;
    }
    for(var i=startSearchIndex;i<len;i++){
        if(arr[i]===query){
            index=i;
            break; //去掉break 可以变成lastIndexOf(),返回最后一个找到元素的位置
        }
    }
    return index
};

var arr=[1,2,3,4,5,6,5,4,3,2,1];
console.log('t',arr.TindexOf(6,1));


//重写every--every()可以检测数组中的每一项是否符合条件
Array.prototype.Myevery= function (callback,content) {
    content=content||window; //在严格模式下，不写这句，会报错
    var passed=true;
    if(typeof callback==="function"){
        for(let i=0,len=this.length;i<len;i++){
            if(passed===false){break}
            //!!test--表示test有数值，不为空，不为undefined的时候
            // !!undefined=!!null=!!""=!!false=false,!!true=!!"aa"=true;
            passed=!!callback.call(content,this[i],i,this);//当callback返回不为空的时候
        }
        return passed;
    }

};
window.a=7; //说明挂载到window上
var ttevery=arr.Myevery(function (item,index) {
    console.log(this);//window{a:7}
    return item<this.a;
});
var scores = [5, 8, 3, 10];
var current = 7;


if(scores.Myevery(function (score) {
    return score > current;
})){
    console.log("朕准了")
}else{
    console.log("来人，拖出去斩了") //输出这句
}
console.log(ttevery);   //true


//重写forEach(item,index,list) --item-当前项，index-当前项索引，list-被遍历的数组
Array.prototype.MyforEach= function (callback, content) {
    content=content||window;
    if(typeof callback==="function"){
        for(let i=0;i<this.length;i++){
            callback.call(content,this[i],i,this)
        }
    }
}
var arr2=[1,2,3,4,5,6,5,4,3,2,1];
//arr2.MyforEach(function (item, index) {
//    console.log("item:"+item,"index:"+index)
//});



//重写map(item,inde,list)
Array.prototype.Mymap= function (callback, content) {
    content=content||window;
    let newArray=[];
    if(typeof callback==="function"){
        for(let i=0;i<this.length;i++){
            let val=callback.call(content,this[i],i,this);
            //if(!!val){
            //    newArray[newArray.length]=val; //如果条件查询的结果为undefined的话，就不赋值进来了,如果没写，mapArr=[undefined,undefined ...,4,5,6,5,4,undefined ...]
            //}
            newArray[newArray.length]=val;
        }
    }
    return newArray

}

var mapArr=arr2.Mymap(function (item,index,list) {
    if(item>3){
        return item
    }
});
console.log(mapArr);// [4,5,6,5,4]


var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
    return obj.value;
});





