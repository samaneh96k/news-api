const { Router } = require("express");

const userController = require("../http/controller/UserController");
const { authenticated } = require("../http/middleware/auth");
const router = new Router();

//  @desc   Login Handle
//  @route  POST /users/login

//  @desc   Handle Forget Password
//  @route  POST /users/forget-password
//router.post("/forget-password", userController.handleForgetPassword);

//  @desc   Handle reset Password
//  @route  POST /users/reset-password/:token
//router.post("/reset-password/:token", userController.handleResetPassword);

//  @desc   Register Handle
//  @route  POST /users/register
router.post("/register", userController.createUser);
router.post("/logining", userController.loginHandeling);
router.post("/forget",authenticated,userController.forgetPass);

router.post('/verifyCode',authenticated, userController.verifyCode);
module.exports = router;
