'use strict';

const NodeCache = require("node-cache");
const serverCache = new NodeCache();


/* #region  Get */
const listKeys = function ListKeys() {
    return serverCache.keys();
}

const getRoom = function GetRoom(roomId) {
    return getKey(`ROOM_${roomId}`);
}
const getKey = function GetKey(key) {
    return serverCache.get(key);
}
/* #endregion */


/* #region  Update */
const updateRoom = function UpdateRoom(room) {
    return serverCache.set(`ROOM_${room.id}`, room);
}
/* #endregion */

/* #region  Insert */
const createRoom = function CreateRoom(room) {
    return serverCache.set(`ROOM_${room.id}`, room, 10000);
}

/* #endregion */


module.exports = {
    getRoom,
    getKey,

    updateRoom,
    createRoom,
    listKeys,
};