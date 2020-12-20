var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/v1', require('./v1'));

// router.get('/session-set', function(req, res, next) {
//   req.session.user={
//     userId:'user-id-efesfesfes',
//   };
//   res.json({ok:'ok'})
// });
// router.get('/session-get', function(req, res, next) {
//   let sess=req.session;
//   if(!sess.user){
//     res.json({status:'not login'})
//   }
//   res.json({status:'has login',user:sess.user});
// });
// router.get('/session-invalid', function(req, res, next) {
//   let aa=req.session.destroy(function(err) {
//     // cannot access session here
//   });
//   res.json({ok:'ok'})
// });

module.exports = router;
