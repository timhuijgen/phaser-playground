'use strict';

import _ from 'lodash';

module.exports = class Keymap {

    constructor( game ) {
        let defaultKeymap = game.playerKeymap;
        let keyboard      = game.input.keyboard;
        this.map          = {};

        _.forEach(defaultKeymap, ( KeyCode, action ) => {
            this.map[ action ] = [];
            if( !_.isArray(KeyCode) ) {
                KeyCode = [ KeyCode ];
            }
            _.forEach(KeyCode, ( code ) => {
                this.map[ action ].push(keyboard.addKey(code));
            });
        });
    }

    isDown( action ) {
        return this.call('isDown', action);
    }

    isUp( action ) {
        return this.call('isUp', action);
    }

    downDuration( action, duration ) {
        return this.call('downDuration', action, duration);
    }

    upDuration( action, duration ) {
        return this.call('upDuration', action, duration);
    }

    call( callable, action, arg ) {
        for( let i = 0, length = this.map[ action ].length; i < length; i++ ) {

            if( "function" === typeof this.map[ action ][ i ][ callable ] ) {
                if( this.map[ action ][ i ][ callable ](arg) ) {
                    return true;
                }
            }
            else if( this.map[ action ][ i ][ callable ] ) {
                return true;
            }
        }
        return false;
    }

    update() {

    }

};