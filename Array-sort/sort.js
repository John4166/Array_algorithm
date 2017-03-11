/**
 * Created by Administrator on 2016/11/7 0007.
 */
var arr=[1,3,2,5,11,10,8,9,44,4,55];
var arr2=[1,3,2,5,11,10,8,9,44,4,55];
/**
 * 冒泡排序法(双循环)
 *会改变原来数组排序
 */
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
var newArr=maopaoSort(arr);

console.log(newArr);

/**
 * 快速排序法
 * 不会改变原来数组排序
 * @param arr
 * 二分法，取数组中间的那个值，然后用这个值跟数组里面的指向比较，大于此值得放一边，小于的放另一边，
 * 然后用concat合并，在进行比较，如此反复
 */
function fastSort(arr) {
    if(arr.length<=1)return arr; //如果只有一个值，不比较直接退出
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
    return fastSort(left).concat(cur,fastSort(right))  //通过递归，上一轮比较好的数组合并，并在此比较

}
var fast=fastSort(arr2);
console.log('fast:'+fast);
console.log(arr2);


/**
 用Array的sort(callback);
 sort(callback) ,callback回调写排序规则，a-b,就是a-b>0
 */

function test() {
    return arr2.sort(sortNumber)
}

function sortNumber(a,b) {
    return a-b
}
var sortFn=test();
console.log(sortFn);

//二路合并，做contact的工作,并且从大到小排序

function contactArray(left,right){
    var result=[];
    var il=0,ir=0;
    var left_len=left.length,right_len=right.length;

    while(il<left_len && ir<right_len){
        if(left[il] && right[ir]){
            if(left[il]<right[ir]){
                result.push(left[il++])
            }else{
                result.push(right[ir++])
            }
        }

    }
    /*****1******/
    while(left[il]){
        result.push(left[il++]);
    }
    while(right[ir]){
        result.push(right[ir++]);
    }
    /*****1******/

    /*****2******/
    //var less=Math.abs(left_len-right_len);
    //var more;
    //if(right_len>left_len){
    //    more="right"
    //}else{
    //    more="left"
    //}
    //if(more==="right"){
    //    while(less){
    //        result.push(right[ir+less--])
    //    }
    //}else{
    //    while(less){
    //        result.push(left[il+less--])
    //    }
    //}
    /*****2******/
    return result
}
//调用
var left=[1,3,5,7,9,11], right=[2,4,6,8,10,22,33,55,44];

var leftAddRight=contactArray(left,right);
console.log(leftAddRight);


//数组删除
//删除数组中指定位置的元素 可用 array.splice(start,deleteNum,args) 改变原数组，原数组将删除从start位置开始的deleteNum个元素，args用来替换删掉的元素（可以有多个参数）
//并返回被删除元素的数组集合，所以事先用slice(start, [end])方法先拷贝原数组，在用splice截取所需数组
//如var arr=[1,2,3,4,5],arr2=arr.splice(0,2,3,4,5) =>arr=[3,4,5,3,4,5] arr2=[1,2]

//删除数组中指定元素

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
var arrtest=[1,2,3];
console.log(arrtest.deleteValue(3));