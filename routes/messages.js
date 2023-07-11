/*
    Path: /api/messages
*/

const {Router} = require('express');
const { getChat, deleteMessage, editMessage, sendMessage } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', sendMessage);
router.get('/', validateJWT, getChat);
router.delete('/delete/:id', deleteMessage);
router.put('/edit', editMessage);

module.exports = router;