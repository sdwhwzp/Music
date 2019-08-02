var multer  = require('multer')
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        console.log(req,file)
        const index = file.originalname.lastIndexOf(".");
        const keepName = file.originalname.substr(index).toLowerCase();
        const arr=[".epub",".txt",".mobi",'.awz3']
        if (arr.includes(keepName)) {
            console.log(file)
            cb(null, file.originalname)
        }else {
            cb(null, "warning")
        }
    }
})
var upload = multer({ storage: storage })
const update=upload.single('book')

module.exports=function(req,update ,cb){

    // if (req.file.filename === "warning") {
    //     console.log("失败")
    //     fs.unlink("./upload/warning",function (err) {
    //
    //         cb({
    //             ok:2,
    //             msg:"请上传符合要求的图书，目前支持'.epub','.txt','.mobi','.awz3'"
    //         })
    //     })
    // }
    // else cb({
    //     ok:1
    // })
    ;
    cb({
        ok:1
    })

};
