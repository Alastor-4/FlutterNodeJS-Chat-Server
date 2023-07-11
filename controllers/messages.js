const Message = require('../models/message');

const sendMessage = async (req, res) => {
        var sendMessage;
        try {
            sendMessage = await recordMessage(req.body);
            if(sendMessage[0])
                res.json({
                    uid: sendMessage[1]._id,
                    from: sendMessage[1].from,
                    to: sendMessage[1].to,
                    message: sendMessage[1].message,
                    createdAt: sendMessage[1].createdAt,
                    updatedAt: sendMessage[1].updatedAt
                });
    
            else return false
            
        } catch (error) {
            console.log(error);
        }
}

const recordMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();
   
        return [true, message];
    } catch (error) {
        return false;
    }
}

const getChat = async (req, res) => {
    const myId = req.uid;
    
    const messagesFrom = req.query.from;

    const messages = await Message.find({
        $or: [{from: myId, to: messagesFrom}, {from: messagesFrom, to: myId}]
    })
    .sort({createdAt: 'desc'})
    .limit(parseInt(req.query.limit));

    res.json({
        ok: true,
        myId,
        messages: messages
    });
}

const deleteMessage = async (req, res) => {
        var deleteMessage;
        try {
             await Message.findByIdAndRemove({
                _id: req.params.id
            }).then((value) => {
                deleteMessage = value;
            });

            res.json({
                ok: true,
                deleteMessage
            });

            return deleteMessage;
            
        } catch (error) {
            console.log(error);
        }
}

const editMessage = async (req, res) => {
        var editMessage;
        console.log(req.body);
        try {
            await Message.findOneAndUpdate({
                _id: req.body._id
            }, req.body).then((value) => {  
                editMessage = value;  
            });

            res.json({
                ok: true,
                message: req.body
            });
            
            return editMessage;
            
        } catch (error) {
            console.log(error);
        }
}

module.exports = {getChat, deleteMessage, editMessage, sendMessage}