const { Router} = require('express');
const router = Router();

const {getRooms, createRoom, getRoom, updateRoom, deleteRoom} = require('../controllers/rooms.controller')

router.route('/')
    .get(getRooms)
    .post(createRoom)

router.route('/:id')
    .get(getRoom)
    .put(updateRoom)
    .delete(deleteRoom)

module.exports = router;