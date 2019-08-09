const  express=require("express")
const path =require("path")
const db=require("./module/db")
const help =require("./module/hp")
const phoneCode=require("./module/phoneCode")
const sing =require('./module/http')
const jwt =require("./module/jwt")
const mailer =require("./module/mailer")
const bodyParser=require("body-parser")
const app = express()
const multer  = require('multer')
const fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {

        const index = file.originalname.lastIndexOf(".");
        const keepName = file.originalname.substr(index).toLowerCase();
        const arr=[".epub",".txt",".mobi",'.awz3']
        if (arr.includes(keepName)) {

            cb(null, file.fieldname + '-' + Date.now())
        }else {
            cb(null, "warning")
        }
    }
})
var upload = multer({ storage: storage })

const update=upload.single('book')
app.use(bodyParser.json())
app.use('/download',express.static(path.join(__dirname,'upload')))
app.post("/token",function (req, res) {
    const token=req.body.token
    db.findOne("admin",{
        token
    },function (err, adminInfo) {
        if (adminInfo) {
            if (adminInfo.token===token){
                res.json(jwt.decode(token))
            }

        }else {
            db.findOne("userList",{
                        token
                    },function (err,userInfo) {
                if (userInfo){
                    res.json(jwt.decode(token))
                } else{
                    res.json({
                        ok:-1,
                        msg:"账号在别处登录"
                    })
                }
            })
        }

    })

})
app.post("/login",function (req, res) {

    const {adminName,passWord}=req.body
    console.log(passWord)
    db.findOne("admin",
        {
            userName:adminName,
            password:help.md5(passWord)
    },function (err, adminInfo) {
        if (adminInfo) {
            const code=help.md5(adminInfo.level)
            const token=jwt.encode(adminName,code)

            db.updateOne("admin",{
                userName:adminName,

            },{
                $set:{
                    token
                }
            },function (err, updateInfo) {
                res.json({
                    token,
                    code,
                    ok:1,
                    msg:"登录成功",
                    userName:adminName
                })
            })
        }else {
            db.findOne("userList",{
                userName:adminName,
                password:help.md5(passWord)
            },function (err, userInfo) {
               if (userInfo) {
                   const code=help.md5(userInfo.level)
                   const token =jwt.encode(adminName,code)

                   db.updateOne("userList",{
                       userName:adminName
                   },{
                       $set:{
                           token
                       }

                   },function (err) {

                       res.json({
                           token,
                            code,
                           ok:1,
                           msg:"登录成功",
                           userName:adminName
                       })
                   })
               }else {
                   help.json(res,-2,"密码错误")
               }

            })

        }
    })

})
app.get('/mail', function (req, res) {
    const mail = req.query.mail
    db.findOne('userList',{mail},function (err, userInfo) {
        if (userInfo) {
            res.json({
                ok:-2,
                msg:"该邮箱已存在,请更换邮箱"
            })
        }else {
            db.findOne('codeList', {mail}, function (err, codeInfo) {
                if (codeInfo) {//存在邮箱

                    let t = Date.now() - codeInfo.sendTime
                    if (t > 60 * 1000) {
                        mailer(mail, function (obj) {
                            if (obj.ok === 1) {//发送成功 得到obj 更新数据库 需要用到$set
                                db.updateOne("codeList", {
                                    mail
                                }, {
                                    $set: {
                                        code: obj.code,
                                        sendTime: Date.now()
                                    }
                                },function (err) {
                                    res.json({
                                        ok:1,
                                        msg:"发送成功"
                                    })
                                })
                            } else {//发送失败
                                help.json(res)
                            }
                        })
                    } else {//没有超过1分钟,不在发送验证码
                        res.json({
                            ok: -2,
                            msg: "时间未到",
                            timer: Math.ceil((60 * 1000 - t) / 1000)
                        })
                    }
                } else {//数据库中没有发现改手机号

                    mailer(mail, function (obj) {//发送验证码 返回的数据obj保存在数据库中
                        if (obj.ok === 1) {//obj.ok===1验证码发送成功 并返回code
                            db.insertOne("codeList", {//将得到的code保存到数据库中
                                mail,
                                code: obj.code,
                                sendTime: Date.now()
                            }, function (err) {

                                help.json(res, 1, "发送成功")
                            })
                        } else {//不为1 发送失败
                            help.json(res)
                        }

                    })
                }

            })
        }
    })

})
app.get("/phoneId",function (req, res) {//发送验证码 get方式
    const phoneId=req.query.phoneId

    db.findOne("userList",{phoneId:phoneId/1},function (err, userInfo) {

        if (userInfo) {
            res.json({
                ok:-2,
                msg:"该手机号已被注册，请更换手机号"
            })
        }else{
            db.findOne("codeList",{phoneId},//根据电话号码查找数据库中是否存在该电话，并将返回的值保存在codeInfo中
                function (err, codeInfo) {
                    if(codeInfo){//如果数据库中存在该手机号，更改验证码和更新时间
                        let t=Date.now()-codeInfo.sendTime//当前的时间减去上次登录的时间
                        if(t>60*1000){//判定是否超过了1分钟 为了防止一直发送验证码
                            phoneCode(phoneId,function (obj) {//超过了1分中 则重新获取验证码
                                if (obj.ok === 1) {//发送成功 得到obj 更新数据库 需要用到$set
                                    db.updateOne("codeList",{
                                        phoneId
                                    },{
                                        $set:{
                                            code:obj.code,
                                            sendTime: Date.now()
                                        }
                                    },function (err) {
                                        res.json({
                                            ok:1,
                                            msg:"发送成功"
                                        })
                                    })
                                }else{//发送失败
                                    help.json(res)
                                }
                            })
                        }else{//没有超过1分钟,不在发送验证码
                            res.json({
                                ok:-2,
                                msg:"时间未到",
                                timer:Math.ceil((60*1000-t)/1000)
                            })
                        }
                    }else{//数据库中没有发现改手机号
                        phoneCode(phoneId,function (obj) {//发送验证码 返回的数据obj保存在数据库中
                            if(obj.ok===1){//obj.ok===1验证码发送成功 并返回code
                                db.insertOne("codeList",{//将得到的code保存到数据库中
                                    phoneId,
                                    code:obj.code,
                                    sendTime:Date.now()
                                },function (err) {
                                    help.json(res,1,"发送成功")
                                })
                            }else{//不为1 发送失败
                                help.json(res)
                            }

                        })
                    }
                })

        }
    })

})
app.post("/logon",function (req,res) {//post方式接收
    const {adminName,passWord,code}=req.body

    const mail =req.body.mail

    const phoneId=req.body.phoneId | ""

    /**
     * 1.连接数据库codeList，从中查询到phoneId保存的code
     * 2.将得到的code与数据库中code做对比，如果相同则进行下一步
     * 3.查询数据库userList,如果没有数据将用户的phoneId保存到数据库userList中
     */
    db.findOne("userList",{userName:adminName},function (err, userInfo) {
        if (userInfo) {
            res.json({
                ok:-2,
                msg:"该账号已存在，请重新输入账号"
            })
        }else{
            db.findOne("codeList",{
                mail
            },function (err, codeInfo) {
                console.log(codeInfo)
                if (codeInfo) {//有验证码

                    if (codeInfo.code === (code / 1)) {//验证码存在

                        if ((Date.now() - codeInfo.sendTime) < 10 * 60 * 1000) {//发送验证码没有超过10分钟
                            db.insertOne("userList", {
                                userName: adminName,
                                password: help.md5(passWord),
                                phoneId,
                                mail,
                                token: "",
                                lastTime: Date.now(),
                                level: help.md5("lv1")
                            }, function (err, results) {
                                res.json({
                                    ok: 1,
                                    msg: "注册成功",
                                    phoneId
                                })
                            })


                        } else {//发送验证码的时间超过了10分钟，验证码失效
                            res.json({
                                ok: -1,
                                msg: "重新发送验证码"
                            })
                        }
                    }
                } else {//如果返回的codeInfo中没有code说明没有发送验证码
                    res.json({
                        ok: -1,
                        msg: "请发送验证码"
                    })
                }
            })
        }
    })



})
app.get('/userName',function (req, res) {

    const userName=req.query.userName

    db.findOne("userList",{userName},function (err, userInfo) {

        if (userInfo) {
            res.json({
                ok:-2,
                msg:"已被注册"
            })
        }else {
            res.json({
                ok:1,
                msg:"未被注册，可以使用"
            })
        }
    })
})
app.get("/detail",function (req, res) {
        const disstid=req.query.disstid
    sing.detail(disstid,function (data) {
        if (data.code === 0) {
            res.json(data)
        }

    })
})
app.get('/singList',function (req, res) {
    sing.singList(function (data) {
        res.json(data)
    })
})
app.get('/singListtwo',function (req, res) {
    sing.singListtwo(function (data) {
        res.json(data)
    })
})
app.delete('/delete',function (req, res) {

    const row=JSON.parse(req.query.row)

    const {_id,userName,code,bookName,path} =row

   db.deleteOneById("bookList",_id,function (err) {
       try{
           fs.unlink("./"+path,function (err) {
               res.json({
                   ok:1,
                   msg:"删除成功"
               })
           })
       }catch (e) {
           res.json({
               ok:-1,
               msg:"删除失败"
           })
       }

   })

})
app.get('/mylist',function (req, res) {
    const userName=req.query.userName
    const whereObj={}

    db.find(userName+"mylist",{
        whereObj,
        sortObj:{
                time:-1
        }
    },function (err,info) {

        let a=info.map((v)=>{
            return v.listName
        })

        if (info.map((v)=>{
            return v.listName
        })=== undefined) {
            res.json({
                ok:1,
                msg:"请创建歌单"
            })
        }else{

                res.json({
                    ok:1,
                    msg:"成功",
                    listName: info.map((v)=>{
                        return v.listName
                    })
                })

        }

    })

})
app.post('/mylist',function (req, res) {

    const {token,name,userName}=req.body
    const info = jwt.decode(token).info
    if (jwt.decode(token).ok===-1) {
         res.json({
                ok:-1,
                msg:"登录信息过期，请重新登录"
            })
        }else {
            if (userName===info.adminName) {
                db.insertOne(userName+"mylist",{
                    listName:name,
                    time:Date.now()
                },function (err) {
                    res.json({
                        ok:1,
                        msg:"创建成功",
                    })
                })
            }
        }

})
app.get('/collections',function (req, res) {

    const {disstid,dissname,total,nick,token,headurl}=req.query

    if (token === undefined) {
        res.json({
            ok:-1,
            msg:"请登录",
            color:"black"
        })
    }else {
        if (jwt.decode(token).ok === -1) {
            res.json({
                ok: -1,
                msg: "登录信息过期，请重新登录"
            })
        } else {
            const userName = jwt.decode(token).info.adminName
            db.insertOne(userName + 'collections', {
                disstid,
                dissname,
                total,
                nick,
                time: Date.now(),
                color: "red",
                headurl
            }, function (err) {
                res.json({
                    ok: 1,
                    msg: '收藏成功',
                    color: "red"
                })
            })
        }
    }

})
app.delete('/collections',function (req, res) {
    const disstid =req.query.disstid
    const token =req.query.token
    if (jwt.decode(token).ok===-1) {
        res.json({
            ok:-1,
            msg:"登录信息过期，请重新登录",
            color:"red"
        })
    }else {
        const userName = jwt.decode(token).info.adminName
        db.findOne(userName+'collections',{disstid},function (err,info){
           db.deleteOneById(userName+'collections',info._id,function (err) {
                res.json({
                    ok:1,
                    msg:"取消收藏成功",
                    color:"black"
                })
            })

        })

    }

})
app.get('/color',function (req, res) {
    const disstid = req.query.disstid
    const userName = req.query.userName
    db.findOne(userName+"collections",{disstid},function (err, info) {

        if (info === null) {
            res.json({
                ok:1,
                msg:"成功",
                color:"black"
            })
        }else {

            res.json({
                ok:1,
                msg:"成功",
                color:"red"
            })
        }
    })
})
app.get('/collectionsList',function (req, res) {
    const userName =req.query.userName
    db.find(userName+"collections",{
        whereObj: {
        }
    },function (err, info) {

        if (info["0"] === undefined) {
            res.json({
                ok:-1,
                msg:'暂无收藏歌单'
            })
        }else {
            res.json({
                ok:1,
                msg:"成功",
                info
            })
        }

    })
})
app.get('/sing',function (req, res) {

    const {name,id,subtitle,token}=req.query
    if (jwt.decode(token).ok === -1) {
        res.json({
            ok:-1,
            msg:"请登录",
            color:"white"
        })
    }else {
        const userName = jwt.decode(token).info.adminName
        db.insertOne(userName+'sing',{
            name,
            id,
            subtitle,
            addTime:Date.now()
        },function (err) {
            res.json({
                ok:1,
                msg:"收藏成功",
                color:"red"
            })
        })
    }

})
app.delete('/sing',function (req, res) {
    const {id,token} =req.query
    if (jwt.decode(token).ok === -1) {
        res.json({
            ok: -1,
            msg: "请登录",
            color: "red"
        })
    }else {
        const userName = jwt.decode(token).info.adminName
        db.findOne(userName+"sing",{
            id
        },function (err, info) {


            db.deleteOneById(userName+"sing",info._id,function (err) {
                res.json({
                    ok:1,
                    msg:"取消收藏",
                    color:"white"
                })
            })

        })
    }
})
app.get('/colorsing',function (req, res) {
    const {userName,id}=req.query
    db.findOne(userName+"sing",{
        id
    },function (err, info) {

        if (info === null) {
            res.json({
                ok:-1,
                color:"white"
            })
        }else {
            res.json({
                ok:1,
                color:"red"
            })
        }

    })
})
app.get('/Mysing',function (req, res) {
    const userName = req.query.userName

    db.find(userName+'sing',{
        sortObj: {
            addTime: -1
        },

    },function (err, info) {

        if (info["0"] === undefined) {
            res.json({
                ok:-1,
                msg:"暂未收藏歌曲"
            })
        }else {
            res.json({
                ok:1,
                info
            })
        }

    })
})
app.listen(80,function () {
    console.log("success")
})