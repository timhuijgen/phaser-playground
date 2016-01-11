'use strict';


module.exports = class CharacterSelect extends Phaser.State {


    preload() {
        //

    }

    create() {
        console.log('Creating CharacterSelect state');
        this.game.state.start('Loading');
    }

};