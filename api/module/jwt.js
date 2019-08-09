const  jwt =require("jwt-simple")
const key="@#$@#%$@#$@#$@#"
module.exports={
    encode(adminName,code,exp=60*60*1000) {

        return jwt.encode({
            adminName,
            code,
            exp:Date.now()+exp
        },key)

    },
    decode(token){
        try{
            const info=jwt.decode(token,key)

            if (info.exp > Date.now()) {

                return {
                    ok:1,
                    msg:"成功",
                    info
                }
            }else {
                return {
                    ok:-1,
                    msg:"过期"
                }
            }
        }
        catch{
            return ({
                ok:-1,
                msg:"解析失败"
            })
        }
    }
}