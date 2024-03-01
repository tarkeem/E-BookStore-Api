const multer=require('multer')
var path=require('path')
var fs=require('fs')
var storage=multer.diskStorage(
    {
        destination:function (req,file,cb) {
            //const { uid } = req.body
            const path = `./uploads/gallery/`
            fs.mkdirSync(path, { recursive: true })
            cb(null,path)
            
        },
        filename:function (req,file,cb) {
            cb(null,Date.now()+'_'+file.originalname)
        }
    }
);

var upload=multer(
    {
       storage:storage
    }
)

exports.upload=upload