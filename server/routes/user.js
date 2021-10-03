const express = require('express');
const router = express.Router();

const {verifyToken} = require('../middleware/jwt')
const userService = require('../services/userService');

router.get('/', verifyToken, (req, res, next) => {
    const {user_email, user_img, user_nickname} = res.locals.user;
    const userData = {user_email, user_img, user_nickname}
    return res.status(200).json({
        code: 200,
        status: 'OK',
        data : userData
    });
})

router.get('/list', async (req, res) => {
    let result;
    const {keyword, popular} = req.query;
    const filterPopular = popular ? JSON.parse( popular.toLowerCase()) : undefined;
    try {
        result = await userService.readUserList(keyword, filterPopular);
    } catch (err) {
        return res.status(500).json({
            code: 500,
            status: 'SERVER ERROR'
        });
    }

    return res.status(200).json({
        code: 200,
        status: 'OK',
        data : result
    });
});

module.exports = router;