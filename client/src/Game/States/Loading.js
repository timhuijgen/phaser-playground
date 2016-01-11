'use strict';


module.exports = class Loading extends Phaser.State {

    preload() {
        // Load specific map assets
        this.game.load.image('background', 'images/assets/map_001_main_bg.jpg');
        this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles-1', 'assets/tiles-1.png');
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    }

    create() {
        this.game.state.start('Main');
    }

};