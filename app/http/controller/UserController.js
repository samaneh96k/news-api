const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var Kavenegar = require('kavenegar');
const NodeCache = require( "node-cache" );
var api = Kavenegar.KavenegarApi({
    apikey: '3043324B31492F4933727442685835515A325A48674D6A44776766625A6C4E7A6E70735275574161396B413D'
});
const myCache = new NodeCache({stdTTL:2*60*60,checkperiod:5*60});
exports.createUser=async (req,res,next)=>{

try{
    await User.userValidation(req.body);
    
    const { fullname, mobile, password ,confirmPassword} = req.body;
    const hashedPw = await bcrypt.hash(confirmPassword, 10);
    const user = await User.findOne({ mobile });
    if (user) {
        const error = new Error(
            "کاربری با این  شماره موبایل  موجود است"
        );
        error.statusCode = 422;
        throw error;
    }else {
        await User.create({ fullname, mobile, password ,confirmPassword:hashedPw});

}

res.status(201).json({ message: "عضویت موفقیت آمیز بود" });
        
    } catch (err) {
        next(err);
    }

}
exports.loginHandeling = async (req, res, next) => {

    const { mobile, password } = req.body;


    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            const error = new Error("کاربری با این موبایل یافت نشد");
            error.statusCode = 404;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("شماره موبایل  یا کلمه عبور اشتباه است");
            error.statusCode = 422;
            throw error;
        }
    
            const token = await jwt.sign(
                {
                    user: {
                        userId: user._id.toString(),
                        mobile: user.mobile,
                        fullname: user.fullname,
                        
                    }
                },
                "secret"
               
            );
            res.status(200).json({ token, userId: user._id.toString() });
     
    } catch (err) {
        next(err);
    }
};
exports.forgetPass= async (req, res, next) => {
    const { mobile } = req.body;


    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            const error = new Error("کاربری با این موبایل یافت نشد");
            error.statusCode = 404;
            throw error;
       
         
        }
        const number=Math.floor((Math.random()*9000)+1000)

   myCache.set(req.userId._id, number)
  
        api.Send({
            message: ` کد تایید شما:${number}`,
            sender: "10008663",
            receptor: "09114579633"
        },
            function(response, status) {
            console.log(response);
            console.log(status);
            res.status(status).send(response);
        });
       
    }catch (err) {
        next(err)
    }

}
exports.verifyCode = async(req, res)=> {
    if (!req.body.code) return res.status(400).send('باید یک کد بفرستید');
    const code = req.body.code;
    const lastCode = myCache.get( req.userId._id);
    console.log(code, lastCode);
    if (code == lastCode) {
      const user = await UserModel.findById(req.userId._id);
      user.active = true;
      await user.save();
      res.status(200).send(true);
    } else res.status(400).send(false);
  }