const express = require('express');

const multer = require('multer');
const router = express.Router();
const fs = require('fs-extra');
// const exeltojson =  require('convert-excel-to-json');

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"uploads")
        },
        filename:function(res,file,cb)
        {
            cb(null,file.fieldname+ ".Xls")
        }
    })
}).single("JUSTWIN");


router.post('/',upload,(req,res,next)=>
{
    res.status(200).json({
        msg:'File Upload'
    })
})







module.exports = router