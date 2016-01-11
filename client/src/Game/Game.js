'use strict';

let States = {
    Boot:            require('./States/Boot'),
    Preload:         require('./States/Preload'),
    CharacterSelect: require('./States/CharacterSelect'),
    CharacterCreate: require('./States/CharacterCreate'),
    Loading:         require('./States/Loading'),
    Main:            require('./States/Main')
};

let ACTION        = require('./Actions');
let defaultKeymap = {
    [ACTION.LEFT]:         [ Phaser.KeyCode.A, Phaser.KeyCode.LEFT ],
    [ACTION.UP]:           [ Phaser.KeyCode.W, Phaser.KeyCode.UP ],
    [ACTION.RIGHT]:        [ Phaser.KeyCode.D, Phaser.KeyCode.RIGHT ],
    [ACTION.DOWN]:         [ Phaser.KeyCode.S, Phaser.KeyCode.DOWN ],
    [ACTION.BASIC_ATTACK]: Phaser.KeyCode.CONTROL,
    [ACTION.SKILL_1]:      Phaser.KeyCode.SPACEBAR
};


class Game extends Phaser.Game {

    constructor( options ) {
        super(options);

        this.playerKeymap = defaultKeymap;

        for( let key in States ) {
            if( typeof States[ key ] === "function" ) {
                this.state.add(key, new States[ key ](), false);
            }
        }

        this.state.start('Boot');
    }
}

module.exports = function() {
    return new Game({
        width:    '100',
        height:   '100',
        renderer: Phaser.CANVAS
    });
};

