'use strict';

let Character = require('./../../Character');

module.exports = class Main extends Phaser.State {


    preload() {
        // Everything shoud be loaded by the loading state
    }

    create() {
        console.log('Creating Main State');

        this.game.collisionObjects = [];
        this.game.character        = null;
        this.game.players          = [];
        this.game.gravity          = 1200;
        this.game.velocity         = {
            x: 150,
            y: 700
        };

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.game.gravity;

        // Background
        this.game.world.setBounds(0, 0, 1920, 1080);
        this.game.add.image(0, 0, 'background');
        this.game.camera.setBoundsToWorld();
        this.game.renderer.renderSession.roundPixels = true;

        // Tiles
        let map = this.game.add.tilemap('level1');
        map.addTilesetImage('tiles-1');
        map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
        let layer = map.createLayer('Tile Layer 1');

        this.game.collisionObjects.push(layer);


        // Add main character after 3 seconds
        setTimeout(() => {
            console.log('Adding character');
            new Character({id: 1, x: 100, y: 100, name: 'Main Character'}).addToGame(this.game, true);
        }, 3000);

        // Add secondary character after 10 seconds
        setTimeout(() => {
            console.log('Adding character');
            new Character({name:'huehue', id: 5, x: 10, y: 10}).addToGame(this.game, false);
        }, 10000);

    }

    update() {

    }

    render() {
        if( this.game.character) {
            this.game.debug.spriteInfo(this.game.character, 32, 32);
        }
        this.game.debug.text(this.game.time.fps, 4, 32);
    }

};