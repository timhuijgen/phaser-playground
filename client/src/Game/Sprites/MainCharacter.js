'use strict';

let Character = require('./Character');
let Movement  = require('./../Input/CharacterMovement');
let Keymap    = require('./../Input/Keymap');

module.exports = class MainCharacter extends Character {

    constructor( game, x, y, key, frame ) {
        super(game, x, y, key, frame);

        this.Keymap = new Keymap(this.game);

        // Add to the game
        this.game.character = this;

        // Set camera to always follow MainCharacter
        this.game.camera.follow(this);

        // Create updatables
        this.updatables = [
            new Movement(this),
            this.Keymap
        ];
    }

    update() {
        super.update();

        for( let i = 0, length = this.updatables.length; i < length; i++ ) {
            this.updatables[ i ].update();
        }
    }

};