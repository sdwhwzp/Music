export default function getVid(state) {
    console.log(state)
    let arr=[];
    state.map((v,i)=>{
        arr.push(v.songmid)
    })
    return arr
}