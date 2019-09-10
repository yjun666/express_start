var mongoose = require("mongoose"); //引入mongoose
// mongoose.connect('mongodb://localhost/list'); //连接到mongoDB的todo数据库
{
    // 连接一张数据库
    // mongoose.connect('mongodb://127.0.0.1:27017/list'); //连接到mongoDB的todo数据库
    // var db = mongoose.connection;
    // 下边是连接model方式
    // mongoose.model('user', ListSchema); //将该Schema发布为Model,user就是集合名称
} {
    // 连接多张数据库
    var list = mongoose.createConnection('mongodb://127.0.0.1:27017/list'); //连接到mongoDB的todo数据库
    var test = mongoose.createConnection('mongodb://127.0.0.1:27017/test'); //连接到mongoDB的todo数据库
}
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 


list.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});

list.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

test.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});

test.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});


var UserSchema = new mongoose.Schema({
    user_id: String, // 定义一个属性user_id，类型为String
    content: String, // 定义一个属性content，类型为String
    updated_at: Date // 定义一个属性updated_at，类型为Date
});

// 定义模型类型，即都需要存储哪些字段数据
var HeroSchema = new mongoose.Schema({
    user_id: String, // 定义一个属性user_id，类型为String
    content: String, // 定义一个属性content，类型为String
    name: String, // 定义name字段
    value: Number, // 定义一个value字段
    age: Number, // 定义一个age字段
    id: String, // 定义一个id字段
    updated_at: Date // 定义一个属性updated_at，类型为Date
});

var StudyTestSchema = new mongoose.Schema({
    user_id: String, // 定义一个属性user_id，类型为String
    content: String, // 定义一个属性content，类型为String
    updated_at: Date // 定义一个属性updated_at，类型为Date
});
list.model('user', UserSchema); //将该Schema发布为Model,user就是集合名称
list.model('hero', HeroSchema); //将该Schema发布为Model,hero就是集合名称
test.model('studyTest', StudyTestSchema); //将该Schema发布为Model,user就是集合名称


module.exports = {
    mongoose,
    list,
    test
};