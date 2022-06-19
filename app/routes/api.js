const router = require('express').Router();
const GroupPageRoute = require('./GroupPageRoute');
const PageRoute = require('./PageRoute');
const UserRoute = require('./UserRoute');

// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header(
//      'Access-Control-Allow-Headers',
//      'Origin, x-auth-token, Content-Type, Accept'
//     )
//     res.header('x-auth-token', ' 3.2.1')
//     next()
//    })
router.use('/GroupPage', GroupPageRoute);
router.use('/page',PageRoute);
router.use('/login',UserRoute);




module.exports = router;