'use strict';

let Module          = require('./Extends/Module');
let MainCharacter   = require('./Game/Sprites/MainCharacter');
let PlayerCharacter = require('./Game/Sprites/PlayerCharacter');

module.exports = class Character extends Module {

    constructor( data ) {
        super(data);

        console.log('Character :: [%s]', this.get('name'));

        this.game   = null;
        this.sprite = null;
    }

    addToGame( game, main = false ) {
        this.game = game;
        this.main = main;
        this.setSprite('dude');
    }

    setSprite( spriteKey ) {
        // Create sprite
        this.sprite = (this.main)
            ? new MainCharacter(this.game, this.get('x'), this.get('y'), spriteKey)
            : new PlayerCharacter(this.game, this.get('x'), this.get('y'), spriteKey);

        return this;
    }

    onCollideEnemy() {

    }

};