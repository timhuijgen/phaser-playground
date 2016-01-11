'use strict';

let ACTION = require('./../Actions');

module.exports = class CharacterMovement {

    constructor( character ) {
        console.log('CharacterMovement');
        this.character  = character;
        this.game       = character.game;
        this.jumps      = 2;
        this.jumping    = false;
        this.inputStack = [];

        // Expected ms per frame = 0.016
        this.mspf = 1 / 60;
        // How many elapsed times we'll save and use to calculate average
        this.maxStack = 100;
        // The stack
        this.timeStack = [];
        // Smooth or simple
        this.smooth = false;
    }

    calculateDelta() {
        // Elapsed time in seconds from last render to this one
        let elapsed = this.game.time.elapsed / 1000;

        if( !this.smooth ) {
            return 1 + (elapsed - this.mspf);
        }

        // Push the elapsed time
        this.timeStack.push(elapsed);

        // Get stack length
        let length = this.timeStack.length;

        // Get the total of the current stack
        let total = 0;
        for( let i = 0; i < length; i++ ) {
            total += this.timeStack[ length - (i + 1) ];
        }

        // The average elapsed time
        let avg = total / length;

        // Remove last item in the stack if it's full
        if( length > this.maxStack ) {
            this.timeStack.splice(0, 1);
        }

        // Calculate the delta factor that we' ll use to modify velocity
        return 1 + (avg - this.mspf);
    }

    update() {
        let df  = this.calculateDelta();
        let now = this.game.time.now;

        this.character.body.velocity.x = 0;

        if( this.character.Keymap.isDown(ACTION.LEFT) ) {

            this.character.body.velocity.x = -(this.game.velocity.x * df);
            this.inputStack.push([ now, 'x', -(this.game.velocity.x * df) ]);


            if( this.character.facing != 'left' ) {
                this.character.animations.play('left');
                this.character.facing = 'left';
            }
        }
        else if( this.character.Keymap.isDown(ACTION.RIGHT) ) {
            this.character.body.velocity.x = this.game.velocity.x * df;
            this.inputStack.push([ now, 'x', -(this.game.velocity.x * df) ]);

            if( this.character.facing != 'right' ) {
                this.character.animations.play('right');
                this.character.facing = 'right';
            }
        }
        else {
            if( this.character.facing != 'idle' ) {
                this.character.animations.stop();

                if( this.character.facing == 'left' ) {
                    this.character.frame = 0;
                }
                else {
                    this.character.frame = 5;
                }

                this.character.facing = 'idle';
            }
        }

        if( !this.character.body.onFloor() && this.jumps == 2 && this.character.Keymap.isDown(ACTION.UP) ) {
            return;
        }

        if( this.character.body.onFloor() ) {
            this.jumps   = 2;
            this.jumping = false;
        }

        if( this.jumps > 0 && this.character.Keymap.downDuration(ACTION.UP, 15) ) {
            this.character.body.velocity.y = -(Math.floor(this.game.velocity.y / Math.pow(1.4, this.jumps - 1))) * df;
            this.inputStack.push([ now, 'y', -((this.game.velocity.y / Math.pow(1.4, this.jumps - 1)) * df), this.character.body.x, this.character.body.y ]);

            this.jumping = true;
        }

        if( this.jumping && this.character.Keymap.upDuration(ACTION.UP) ) {
            this.jumps--;
            this.jumping = false;
        }

        if( this.character.Keymap.isDown(ACTION.DOWN) ) {

        }
    }

};