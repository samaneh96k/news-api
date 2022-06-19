const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const validatorCreatePageGroup=(data)=>{
    const schema = Joi.object({
        GroupTitle:Joi.string().required(),
        score:Joi.number()
    })
    return schema.validate(data);
}
const validatorUpdatePageGroup=(data)=>{
    const schema = Joi.object({
        GroupTitle:Joi.string()
    
    })
    return schema.validate(data);
}

const validatorCreatePage=(data)=>{
    const schema = Joi.object({
        Title:Joi.string().required(),
        ShortText:Joi.string().required(),
        Text:Joi.string().required(),
        TagsPage:Joi.string(),
        ImageName:Joi.string(),
        Visit:Joi.string(),
        CreateDate:Joi.string(),
        AddToSlide:Joi.string(),
        score:Joi.number()
    })
    return schema.validate(data);
}
const validatorUpdatePage=(data)=>{
    const schema = Joi.object({
        Title:Joi.string(),
        ShortText:Joi.string(),
        Text:Joi.string(),
        TagsPage:Joi.string(),
        ImageName:Joi.string(),
        Visit:Joi.string(),
        CreateDate:Joi.string(),
        AddToSlide:Joi.string(),
        score:Joi.number()
    })
    return schema.validate(data);
}
const validatorCommentPage=(data)=>{

   const schema = Joi.object({
    name:Joi.string().required(),
    Email:Joi.string().required(),
    Comment:Joi.string().required(),
    CreateDate:Joi.string(),
    score:Joi.number()
   })
   return schema.validate(data);
}
module.exports = {validatorCreatePageGroup ,validatorCreatePage,validatorUpdatePage,validatorUpdatePageGroup };
