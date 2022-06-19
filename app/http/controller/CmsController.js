const CmsModel=require('../../models/Cms');
const Yup = require("yup");
const fs=require("fs");
const path = require('path');
const _=require('lodash');
const{ validatorCreatePageGroup,validatorCreatePage,
    validatorUpdatePage}= require('../validator/cmsValidator');
const sharp = require('sharp');
   
class CmsController {
    async createGroup(req,res){
        const { error } = validatorCreatePageGroup(req.body);
    if (error) return res.status(400).send(error.message);
    let cms = new CmsModel(
      _.pick(req.body, [
        'GroupTitle'
       
     
      ]),
    );
   
     await cms.save();
    res.send(cms);
    } 
    async getListGroup(req,res){
        const groups = await CmsModel.find();
     
      
        res.status(200).json({ groups });
      
    }   
    async getOneGroup(req,res){
        const id = req.params.id;
        const data = await CmsModel.findById(id).select();
        if (!data) return res.status(404).send('not found');
        res.send(data);
        res.status(200).json({ data
        });
    }   
    async deleteٖGroup(req,res){
        const id = req.params.id;
        const result = await CmsModel.findByIdAndRemove(id);
        res.status(200).send("deleted");
    }
    async createPage(req,res){
        
      const id = req.params.id;
      const groups = await CmsModel.find();
      const list = await CmsModel.findById(id).select();
        if(!list) return res.status(404).send("مقاله مربوطه پیدا نشد");
        const {error }= validatorCreatePage(req.body);
        if(error) return res.status(400).send(error.message);


   
        const body=({..._.pick(req.body,["Title","ShortText","Text","AddToSlide"
     
      ]),imageUrl:`/${(req.file.filename)}`,CreateDate: Date.now(),TagsPage:req.body.TagsPage})
    
      list.Pages.push(body);
        await list.save();
       
        res.send(true);
      
        res.status(200).json({ groups
       });
    

    }
    async updateGroup (req, res, next) {
      const Id = req.params.id;
    
   
      const data = await CmsModel.findById(Id).select();
    
      data.GroupTitle= req.body.GroupTitle;
      await data.save();
      res.status(200).json({ data });
    }
    async addCommentToPage(req,res){
      //const list = await CmsModel.findOne();
        

      const pageId = req.params.pageId;
      const groupId=req.params.id;
      const list = await CmsModel.findById(groupId).select();

      const page = list.Pages.id(pageId);
      const body = {
        name : req.body.name,
        Email : req.body.Email,
        Comment : req.body.Comment,
        CreateDate: Date.now()
      }
      page.PageComment.push(body)
      await list.save();
      res.send(true);
    
      res.status(200).json({ list });
    }
    async GetCommentPage(req,res){
    
      const pageId = req.params.pageId;
      const groupId=req.params.id;
      const list = await CmsModel.findById(groupId).select();

      const page = list.Pages.id(pageId);


     const comment= page.PageComment;
  
      res.send(true);
      res.status(200).json({ comment });
     
    }
    async getPages(req,res){
      const Id = req.params.id;
      const data = await CmsModel.findById(Id).select();
      if (!data) return res.status(404).send('not found');
      const result=await data.Pages
      res.status(200).json(result);
  
    }
 
    async updatePage(req,res){
      const groupId=req.params.id;
      const PageId=req.params.pageId;
      const list = await CmsModel.findById(groupId).select();
        
      if(!list) return res.status(404).send("مقاله مربوطه پیدا نشد");
     
      // const { error } = validatorUpdatePage(req.body);
      // if (error) return res.status(400).send(error.message);

      const result = await list.Pages.id(PageId);
//      const imgPath=path.join(__dirname,`../../../uploads/${result.imageUrl}`)
// console.log(imgPath);
// fs.unlink(imgPath, (err => {
//   if (err) console.log(err);
//   else {
//     console.log("\nDeleted file: example_file.txt");

//   }
// }));



      if (req.file) {
        result.imageUrl = `/${req.file.filename}`;
    }
    if (!result.imageUrl) {
        const error = new Error('No image picked.');
        error.statusCode = 422;
        throw error;
    }
      if(result){
        if(req.body.Title)
        result.Title=req.body.Title;
          if(req.body.ShortText)
        result.ShortText=req.body.ShortText;
          if(req.body.Text)
        result.Text=req.body.Text;
         if(req.body.imageUrl)
        result.imageUrl=req.body.imageUrl;  
      
        result.CreateDate= result.CreateDate;
result.TagsPage=req.body.TagsPage;
result.AddToSlide=req.body.AddToSlide;
      }
      await list.save();
      res.status(200).json({result});
    }
    async getOnePage(req,res){
      const groupId=req.params.id;
      const PageId=req.params.pageId;
      const list = await CmsModel.findById(groupId).select();
        
      if(!list) return res.status(404).send("مقاله مربوطه پیدا نشد");

      const { error } = validatorUpdatePage(req.body);
      if (error) return res.status(400).send(error.message);

     const result = await list.Pages.id(PageId); 


 
      res.status(200).json(result);
    }
    async deletePage(req,res){
      const groupId=req.params.id;
      const PageId=req.params.pageId;
      const groups = await CmsModel.find();
      const list = await CmsModel.findById(groupId).select();
        
      if(!list) return res.status(404).send("مقاله مربوطه پیدا نشد");
      
      const { error } = validatorUpdatePage(req.body);
      if (error) return res.status(400).send(error.message);

      const result = list.Pages.id(PageId);
      if(result)
        result.remove();
      await list.save();
      res.status(200).json({groups});
  
    }
    async deleteComment(req,res){
      const groupid = req.params.id;
      const pageid=req.params.pageId;
      const commentid=req.params.commentId;
      const groups = await CmsModel.find();
      const group=await CmsModel.findById(groupid).select();
      const page= group.Pages.id(pageid);
      const comment= page.PageComment.id(commentid);
   
    
      if(comment)
    comment.remove();
    await group.save();
  
      res.status(200).json({page,groups});

    }
    async  handleContactPage  (req, res) {
      const errorArr = [];
  
      const { fullname, email, message } = req.body;
  
      const schema = Yup.object().shape({
          fullname: Yup.string().required("نام و نام خانوادگی الزامی می باشد"),
          email: Yup.string()
              .email("آدرس ایمیل صحیح نیست")
              .required("آدرس ایمیل الزامی می باشد"),
          message: Yup.string().required("پیام اصلی الزامی می باشد"),
      });
  
      try {
          await schema.validate(req.body, { abortEarly: false });
  
          sendEmail(
              email,
              fullname,
              "پیام از طرف وبلاگ",
              `${message} <br/> ایمیل کاربر : ${email}`
          );
  
          res.status(200).json({ message: "پیام شما با موفقیت ارسال شد" });
      } catch (err) {
          err.inner.forEach((e) => {
              errorArr.push({
                  name: e.path,
                  message: e.message,
              });
          });
          res.status(422).json({ error: errorArr });
      }
  };
}
module.exports = new CmsController();
