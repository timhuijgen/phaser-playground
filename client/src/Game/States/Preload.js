'use strict';


module.exports = class Preload extends Phaser.State {


    preload() {
        // Create loading bar
        // Load all generic game assets
        this.game.time.advancedTiming = true;

    }

    create() {
        console.log('Creating Preload state');
        this.game.add.plugin(Phaser.Plugin.Debug);
        this.game.state.start('CharacterSelect');
    }

};