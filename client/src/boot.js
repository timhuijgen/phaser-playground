'use strict';

let Game     = require('./Game/Game');

try {

    window.game = new Game();

} catch( e ) {
    console.log('Exception caught', e);
}