const router = require('express').Router();
const controller= require('../http/controller/CmsController')
const { authenticated } = require("../http/middleware/auth");
 router.get('/', controller.getListGroup);

router.post('/',authenticated, controller.createGroup);
 router.put('/:id',authenticated, controller.updateGroup);
 router.delete('/:id',authenticated, controller.deleteٖGroup);
 router.get('/:id', controller.getPages);


module.exports = router;
