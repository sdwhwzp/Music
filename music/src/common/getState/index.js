import singerSrc from "../img"//引入图片封装方法
export default function getState(state){
    let obj={
    };
    let hot=[]
    for (let i=0;i<state.ListSinger.length;i++) {//遍历state将state中的元素按首字母分类
                let el = state.ListSinger[i];
                el.avator=singerSrc(el.Fsinger_mid)
                let {Findex,Fsinger_name,avator,Fsinger_mid}=el;
                if(i<10){
                    hot.push({Findex,Fsinger_name,avator,Fsinger_mid})
                }
                if(obj[el.Findex]){
                    obj[el.Findex].push({Findex,Fsinger_name,avator,Fsinger_mid})
                }else {
                    obj[el.Findex]=[]
                    obj[el.Findex].push({Findex,Fsinger_name,avator,Fsinger_mid})
                }
            }
            delete obj[9]
            delete obj[hot]



        let newkey = Object.keys(obj).sort();//按照首字母排序
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        let newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }


    return newObj

}