

const express = require('express');
const router = express.Router();
const multer = require("multer");
const { authenticated } = require("../http/middleware/auth");
const controller= require('../http/controller/CmsController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+"-"+file.originalname)
    },
   limits:
    { fileSize: 4000000 }
})
   
var upload = multer({ dest: "/", storage: storage })
//setHeaders();
 router.get('/getPage/:id', controller.getPages);
 router.get('/:id/:pageId', controller.getOnePage);
 router.post('/addpage/:id', upload.single('imageUrl'),authenticated, controller.createPage);
 router.put('/:id/:pageId',upload.single('imageUrl'),authenticated, controller.updatePage);
 router.delete('/:id/:pageId',authenticated, controller.deletePage);
 router.delete('/:id/:pageId/:commentId',authenticated, controller.deleteComment);
 
router.post("/addCommentPage/:id/:pageId",authenticated,controller.addCommentToPage);

router.get("/CommentPage/:id/:pageId",authenticated,controller.GetCommentPage);
//  @route  POST /dashboard/image-upload




module.exports = router;