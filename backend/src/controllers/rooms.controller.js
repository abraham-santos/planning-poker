const roomsCtrl = {};

const Room = require('../models/Room');

roomsCtrl.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms)
}

roomsCtrl.createRoom = async (req, res) => {
    const {roomname, project, userstory} = req.body;
    const newRoom = new Room({
        roomname: roomname,
        project: project,
        userstory: userstory
    });
    await newRoom.save();
    res.json({message: 'Room saved.'})
}

roomsCtrl.getRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.json(room)
}

roomsCtrl.updateRoom = async (req, res) => {
    const {project, userstory, unhiddenvotes, estimation} = req.body;
    await Room.findByIdAndUpdate(req.params.id,{
        project: project,
        userstory: userstory,
        unhiddenvotes: unhiddenvotes,
        estimation: estimation
    },{new: true});
    res.json({message: 'Room updated.'})
}

roomsCtrl.deleteRoom = async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({message: 'Room deleted.'})
}

module.exports = roomsCtrl;