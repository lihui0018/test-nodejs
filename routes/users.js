var express = require('express');
var router = express.Router();
var query = require("../util/mysql.js");

var models = require("../util/model.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

var mysql = require('mysql');

router.get('/show', function(req, res){
    query("select 1 + 1 as solution",function(err,vals,fields){
        if(err) throw err;
        res.send(""+vals[0].solution);
    });
});

router.get("/model", function(req, res){
    var user = new models.User({
        first_name : "aaa",
        last_name : "bbb",
        email: "xx@yy.cc",
        password : "xxx",
        active : true,
        created : new Date()
    });

    user.save().then(function(model){
        res.json({message:'done', data: user});
    }).catch(function(err){
        res.json({message: 'error', data: err});
        throw err;
    });
});

router.get("/findall", function(req, res){
    models.User.forge().fetchAll().then(function(users) {
        res.json({message: 'done', data: users});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
});

router.route('/find/:userId').get(function(req, res) {
    models.User.forge({
        id: req.params.userId
    }).fetch().then(function(user) {
        res.json({message: 'done', data: user});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
});

router.route('/update/:userId/:userName').get(function(req, res) {
    models.User.forge()
        .where('id', '=', req.params.userId)
        .save({
            first_name: req.params.userName,
        }, {patch: true}).then(function(user) {
        res.json({message: 'done', data: user});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
});

router.route('/delete/:userId').get(function(req, res) {
    models.User.forge()
        .where('id', '=', req.params.userId)
        .destroy().then(function(user) {
        res.json({message: 'done', data: user});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
});

module.exports = router;
