/**
 * Created by Administrator on 2017/3/11.
 */
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