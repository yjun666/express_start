// 实现基本的增删改查，没使用数据库,仅仅操作了json
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

function add(obj, res) {
    fs.readFile(path.join(__dirname, '../public/json/test.json'), function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data);
        if (data.length >= 10) {
            data.length = 1;
        }

        if (data.some((item) => item.id === obj.id)) {
            res.send(JSON.stringify({
                "err": 'id 已经存在'
            }));
            return;
        }

        data.push({
            id: obj.id,
            name: obj.name,
            age: obj.age,
        });
        data = JSON.stringify(data);
        fs.writeFile(path.join(__dirname, '../public/json/test.json'), data, (err) => {
            if (err) throw err;
            console.log('文件已保存');
        });
        res.send(data);
    });
}

/* GET users listing. */
// add 方法，添加数据
router.post('/add', function (req, res, next) {
    add(req.body, res);
});

function deleteData(obj, res) {
    fs.readFile(path.join(__dirname, '../public/json/test.json'), function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data);
        if (data.length <= 2) {
            res.send({
                'err': '删除失败，不能再删除了，你再删除就没有数了'
            });
            return;
        }

        const isHasId = data.find((item, itemIndex) => {
            return item.id == obj.id;
        })
        if (isHasId) {
            function reWrite() {
                data = JSON.stringify(data);
                fs.writeFile(path.join(__dirname, '../public/json/test.json'), data, (err) => {
                    if (err) throw err;
                    console.log('文件已保存');
                });
                res.send(data);
            };
            for (let i = 0; i < data.length; i++) {
                if (data[i]['id'] === obj.id) {
                    data.splice(i, 1);
                    break;
                }
            }
            reWrite();
        } else {
            res.send({
                'err': "id 不存在！！！"
            });
            return;
        }
    });
}

function changeData(obj, res) {
    fs.readFile(path.join(__dirname, '../public/json/test.json'), function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = JSON.parse(data);

        const isHasId = data.find((item, itemIndex) => {
            return item.id == obj.id;
        })

        if (isHasId) {
            function reWrite() {
                data = JSON.stringify(data);
                fs.writeFile(path.join(__dirname, '../public/json/test.json'), data, (err) => {
                    if (err) throw err;
                    console.log('文件已保存');
                });
                res.send(data);
            };
            isHasId['name'] = obj.name;
            isHasId['age'] = obj.age;
            reWrite();
        } else {
            res.send({
                'err': "id 不存在！！！"
            });
            return;
        }
    });
}

router.post('/delete', function (req, res, next) {
    deleteData(req.body, res);
});
router.post('/change', function (req, res, next) {
    changeData(req.body, res);
});
router.get('/getData', function (req, res, next) {
    fs.readFile(path.join(__dirname, '../public/json/test.json'), function (err, data) {
        if (err) {
            return console.error(err);
        }
        res.send(data.toString());
    });
});



module.exports = router;