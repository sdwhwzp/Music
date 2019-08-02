/*
* 接口地址：http://v.juhe.cn/sms/send
返回格式：json/xml
请求方式：http get/post
请求示例：http://v.juhe.cn/sms/send?mobile=手机号码&tpl_id=短信模板ID&tpl_value=%23code%23%3D654654&key=
*/

const request=require("request")
const querystring=require("querystring")
const hp=require("./hp")
module.exports=function (phoneId,cb) {
    const code=hp.getRandom(100000,999999)
    const mobile=phoneId
    const tpl_id="174079"
    const tpl_value="#code#="+code
    const key="6b5cc862d76d7acfe887caeea8dc30fc"
    console.log(tpl_value)
    let url="http://v.juhe.cn/sms/send?"

    url+=querystring.stringify({
        mobile,
        tpl_id,
        tpl_value,
        key
    })
    request(url,function (err, response, body) {
        if (!err && response.statusCode === 200) {

            console.log(body)
            cb({
                ok:1,
                code:code
            })
        }else{
            cb({
                ok:-1,
                msg:"发送失败"
            })
        }

    })

}
