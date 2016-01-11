'use strict';

let Character = require('./Character');

module.exports = class PlayerCharacter extends Character {

    constructor( game, x, y, key, frame ) {
        super(game, x, y, key, frame);

        // Add to the game
        this.game.players.push(this);

        // Make sure the character can move outside of the camera
        this.body.fixedToCamera = false;
    }

    update() {
        super.update();
    }

};