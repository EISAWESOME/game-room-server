'use strict';

class Room {
    constructor(id, ruleset, users = []) {
        this.id = id;
        this.ruleset = ruleset;
        this.users = users
    }
}

module.exports = Room;