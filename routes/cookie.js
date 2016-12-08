var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/set_c', function(req, res, next) {
    res.cookie('isVisit', 1);
    req.session.visit = 1;
    res.send("set cookie ok!");
});

router.get('/get_c', function(req, res, next) {
    res.send("get cookie:"+req.session.visit + req.cookies.isVisit);
});

module.exports = router;