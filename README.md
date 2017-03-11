# Array_algorithm
数组算法和重写

##目录
````
1.sort                 ---数组排序法，包括冒泡排序、快速排序、原生sort()
2.deepcopy             ---数组的深度拷贝
3.quchong              ---数组的去重
4.random               ---产生一个数组，数组的值是min到max之间的数，随机排列
5.indexOf              ---es5新的数组方法重写，包括indexOf，every，forEach，map
6.deleteValue          ---删除数组中指定的值，返回删除后的数组


````

##数组排序
###1.冒泡排序法
冒泡排序法其实就是双循环比较，用arr[0]和arr[1]...[arr.length-1]比较，如果arr[0],比较大，arr[0]和比较的数换位，以此类推
````
function maopaoSort(arr) {
        for(var i=0;i<arr.length;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[i]>arr[j]){
                    var temp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }
            }
        }
        return arr;
    }
````
###2.快速排序法
快速排序法就是二分法+递归方法
````
function fastSort(arr) {
        if(arr.length<=1)return arr;
        var index=Math.floor(arr.length/2);
        var cur=arr.splice(index,1);
        var left=[],right=[];
        for (var i=0;i<arr.length;i++){
            if(cur>arr[i]){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return fastSort(left).concat(cur,fastSort(right))

    }
````

##2.Array.prototype.sort(callback)
````
    Array.prototype.sortNumbers=function(callback) {
        return this.sort(callback)
    }

    function callback(a,b) {
        return a-b
    }
    [1,3,4,5].sortNumbers(callback)
````

##3.deepcopy-数组深度拷贝
````
  function deepcopy(arr) {
        var out = [],i = 0,len = arr.length;
        for (; i < len; i++) {
            if (isArray(arr[i])){
                out[i] = deepcopy(arr[i]);
            }
            else{out[i] = arr[i];}
        }
        return out;
    }
````

##4.数组去重
利用对象json[key]查看key是否存在，key为json对象的属性
````
function removeReplace(arr){
        var json = {};
        var outArr=[];
        for(var i=0;i<arr.length;i++){
            if(!json[arr[i]]){
                outArr.push(arr[i]);
                json[arr[i]]=true
            }
        }
        return outArr
    }
````
利用原型和this，这么做的好处就是方法绑定在数组的原型上，可以使用链式调用，不是数组类型是调用不到
````
 Array.prototype.unique= function () {
        var json = {};
        var outArr=[];
        for(var i=0;i<this.length;i++){
            if(!json[this[i]]){
                outArr.push(this[i]);
                json[this[i]]=true
            }
        }
        return outArr
    }
````
链式调用
````
    [1,2,3,3,3,4,4,5,5].unique()
````

##5.random
产生一个数组，数组的值是min到max之间的数，随机排列
难点,随机数*len，就可以生成len个随机数 ,Math.random()生成[0,1)的数，包括0 ，但不包括1
所以，要生成min到max之间的数
````
len=max-min
Math.floor(Math.random().len+min)
````
然后再用数组去重的方法，将重复的数组去掉，最后排序，看看结果是否正确
````
 function createRandomNum(min,max){
            var array=[];
            var len=max-min+1;
            while(true){
                var random=Math.floor(Math.random()*len+min);
                 if(array.inArray(random)){
                    continue;
                }else{
                    array.push(random);
                    if(array.length==len){
                        break;
                    }
                }
            }
            return array;
        }
````
调用(fastSort的实现自行看数组排序章节)
````
createRandomNum(2,32).fastSort()
````
但以上做法优缺点，消耗太多性能，因为Math.floor(Math.random()*len+min)随机生成的整数可能会重复出现，所以重复的次数可能会很大，消耗太多性能
以下做法，能大幅度减少消耗的镜头
````
 function createArray(min, max) {
            var result = []; //随机排序后的数组
            var areaArray = [];  //循环生成[min,max]的数组
            for(let i =min;i<=max;i++){
                areaArray.push(i);
            }
            var len=areaArray.length;//长度要先获取，不然在循环中设置，数组长度会不断改变
            for(let i = 0; i < len; i++) {
                var randomIndex = parseInt(areaArray.length * Math.random());
                result.push(areaArray[randomIndex]);
                areaArray.splice(randomIndex,1);  //删除已经放到result的数
            }
            return result;
        }
````

##6.indexOf
此页面重写了多个es5的数组方法的兼容性写法
兼容性写法的框架为：
````
Array.prototype.fn||Array.prototype.fn=function(){
}
````
ps:我写得时候没有按照上面的格式来，为了区别于浏览器原有的方法，我都讲方法名增加了前缀
###indexof
````
Array.prototype.MyindexOf=function(query){
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
````
###forEach(item,index,list) --item-当前项，index-当前项索引，list-被遍历的数组
````
Array.prototype.MyforEach= function (callback, content) {
    content=content||window; //在严格模式下，不写这句，会报错
    if(typeof callback==="function"){
        for(let i=0;i<this.length;i++){
            callback.call(content,this[i],i,this)
        }
    }
}
````
解释：
1.我对fn.call(obj,args...)的简单理解是：call让obj拥有fn这个函数，并让this指针指向obj,同时将args当做fn的参数，并执行fn
2.callback.call(content,this[i],i,this)--让content调用callback方法，并将this[i],i,this参数传入，this--调用的数组array,i--array的索引,this[i]--当前项
3.content=content||window ,当MyforEach(callback),只有callback一个参数的时候，content默认为window,我将它简单的理解为，将callback挂载到window上了，有点类似于jquery源码将(jquery，window)当做参数传传入函数一个意思（简单理解，如有不对，希望指出）
此时，如果写上：
````
window.a=7;
arr.MyforEach(function (item,index) {
    console.log(this);  //window {a:7}
    return ...
});
````
以上说明，callback中的this指向了content，就默认的window
但如果给content，传上了参数，如：
````
arr.MyforEach(function (item,index) {
    console.log(this);  //{a:7}
    return ...
},{a:7});
````
则，this指向了{a:7}这个对象

5.如果是严格模式，content=content ||window这句不写就会报错

###every
````
Array.prototype.Myevery= function (callback,content) {
    content=content||window;
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
````
调用方法
````
var ttevery=arr.Myevery(function (item,index) {
    return item<this.a;
});
````
###map()
````
Array.prototype.Mymap= function (callback, content) {
    content=content||window;
    let newArray=[];
    if(typeof callback==="function"){
        for(let i=0;i<this.length;i++){
            let val=callback.call(content,this[i],i,this);
            newArray[newArray.length]=val;
        }
    }
    return newArray

}
````

##6.arr.deteleValue(val)
删除数组中的指定值，并返回删除后的数组

````
Array.prototype.deleteValue= function (val) {
    var arr=this,i=0,index=-1;
    for(;i<arr.length;i++){
        if(arr[i]===val){
            index=i
        }
    }
    arr.splice(index,1);
    var result=[];
    result=arr;
    return result
}
````







