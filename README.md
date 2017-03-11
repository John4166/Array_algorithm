# Array_algorithm
数组算法和重写

##目录
````
1.sort                 ---数组排序法，包括冒泡排序、快速排序、原生sort()
2.deepcopy             ---数组的深度拷贝
3.quchong              ---数组的去重
4.maxIndex             ---判断一个字符串中出现次数最多的字符，统计这个次数
5.random               ---产生一个数组，数组的值是min到max之间的数，随机排列
6.indexOf              ---es5新的数组方法重写，包括indexOf，every，forEach，map
7.deleteValue          ---删除数组中指定的值，返回删除后的数组

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
、、、
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
、、、

##3.Array.prototype.sort(callback)
、、、
    Array.prototype.sortNumbers=function(callback) {
        return this.sort(callback)
    }

    function callback(a,b) {
        return a-b
    }
    [1,3,4,5].sortNumbers(callback)
、、、

##4.deepcopy-数组深度拷贝
、、、
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
、、、

##5.数组去重
利用对象json[key]查看key是否存在，key为json对象的属性
、、、
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
、、、
利用原型和this，这么做的好处就是方法绑定在数组的原型上，可以使用链式调用，不是数组类型是调用不到
、、、
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
、、、
链式调用
、、、
    [1,2,3,3,3,4,4,5,5].unique()
、、、






