var knex = require('knex'),
    db; // 数据库连接

// 数据库连接配置
var config = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        charset: 'utf8'
    }
};

// 保证数据库连接只初始化一次。
if (!db) {
    db = knex(config);
}

var bookshelf = require('bookshelf')(db);

bookshelf.User = bookshelf.Model.extend({
    tableName: 'users'
});

module.exports=bookshelf;