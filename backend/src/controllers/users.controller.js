const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req ,res) => {
    const users = await User.find();
    res.json(users)
};

userCtrl.createUser = async (req, res) => {
    const {user, valuevote, statusvote, ismoderator, roomname} = req.body;
    const newUser = new User({
        user: user,
        valuevote: valuevote,
        statusvote: statusvote,
        ismoderator: ismoderator,
        roomname: roomname
    });
    await newUser.save();
    res.json({message: 'User saved.'})
}

userCtrl.getUser = async (req, res) => {
    const user1 = await User.findById(req.params.id);
    res.json(user1)
}

userCtrl.updateUser = async (req, res) => {
    const {user,valuevote, statusvote, ismoderator, roomname} = req.body;
    await User.findByIdAndUpdate(req.params.id,{
        user: user,
        valuevote: valuevote,
        statusvote: statusvote,
        ismoderator: ismoderator,
        roomname: roomname
    },{new: true});
    res.json({message: 'User updated.'})
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted.'})
}

module.exports = userCtrl;