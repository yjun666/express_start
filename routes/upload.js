const express = require('express');
const router = express.Router();
//上传图片的模板
var multer = require('multer');
//生成的图片放入uploads文件夹下
var upload = multer({
    dest: 'uploads/'
})
//图片上传必须用post方法
router.post('/file', upload.single('test'), (req, res) => {
    //读取路径（req.file.path）
    // fs.readFile(req.file.path, (err, data) => {
    //     //读取失败，说明没有上传成功
    //     if (err) {
    //         return res.send('上传失败')
    //     }
    //     //否则读取成功，开始写入
    //     //我们先尝试用原文件名originalname写入吧
    //     // 三个参数
    //     //1.图片的绝对路径
    //     //2.写入的内容
    //     //3.回调函数  
    //     fs.writeFile(path.join(__dirname, '../../static/img/' + req.file.originalname), data, (err) => {
    //         if (err) {
    //             return res.send('写入失败')
    //         }
            res.send({
                err: 0,
                msg: '上传ok'
            })
        // })
    // })
})

module.exports = router;