const roomsCtrl = {};

const Room = require('../models/Room');

// Get a list of available rooms
roomsCtrl.getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms)
}

// Create a room
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

// Get a room by Id
roomsCtrl.getRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.json(room)
}

// Update a room
roomsCtrl.updateRoom = async (req, res) => {
    const {project, userstory, estimation, showcards} = req.body;
    await Room.findByIdAndUpdate(req.params.id,{
        project: project,
        userstory: userstory,
        estimation: estimation,
        showcards: showcards
    },{new: true});
    res.json({message: 'Room updated.'})
}

// Delete a room
roomsCtrl.deleteRoom = async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({message: 'Room deleted.'})
}

module.exports = roomsCtrl;