'use strict';


module.exports = class Boot extends Phaser.State {

    preload() {

    }

    create() {
        console.log('Creating Boot state');

        this.addKeyCapture([
            Phaser.KeyCode.SPACEBAR,
            Phaser.KeyCode.UP,
            Phaser.KeyCode.DOWN,
            Phaser.KeyCode.LEFT,
            Phaser.KeyCode.RIGHT,
            Phaser.KeyCode.PAGE_DOWN,
            Phaser.KeyCode.PAGE_UP,
            Phaser.KeyCode.BACKSPACE,
            Phaser.KeyCode.ESC
        ]);

        this.game.state.start('Preload');
    }

    addKeyCapture(keys)
    {
        this.game.input.keyboard.addKeyCapture(keys);
    }

};