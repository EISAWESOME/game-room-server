'use strict';

class Room {
    constructor(id, users = []) {
        this.id = id;
        this.users = users
    }
}

module.exports = Room;