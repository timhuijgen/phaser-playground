'use strict';

module.exports = class Character extends Phaser.Sprite {

    constructor( game, x, y, key, frame = 0 ) {
        // Create the actual sprite
        super(game, x, y, key, frame);

        // Create body
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.facing = 'right';

        // Set body options
        //this.body.collideWorldBounds = true;
        this.body.setSize(20, 32, 5, 16);

        // Set animations
        this.setAnimations();

        // Draw to game
        this.game.stage.addChild(this);
    }

    setAnimations() {
        this.animations.add('left', [ 0, 1, 2, 3 ], 10, true, true);
        this.animations.add('turn', [ 4 ], 20, true, true);
        this.animations.add('right', [ 5, 6, 7, 8 ], 10, true, true);
    }

    update() {
        this.game.physics.arcade.collide(this, this.game.collisionObjects);
    }

};