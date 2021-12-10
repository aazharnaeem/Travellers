const express = require('express');
const upload = require('../middleware/uploads')
const { authenticateJWT } = require('../middleware/tokenAuthorization')
const user = require('../controller/user')

const router = express.Router();


router.router('/register').post(user.register);
router.router('/login').post(user.login);



// router.route('/addImage').post(upload.single('image') , authenticateJWTuser.addImage)


module.exports = router;


