'use strict';

let _ = require('lodash');

module.exports = class InputMap {

    constructor() {
        this.input       = [];
        this.virtualKeys = {};
        this.step        = 1000 / 60;

        this.lastUpdate = 0;
    }

    addInput( input ) {
        _.extend(this.input, input);
    }

    isDown( action ) {
        if( this.virtualKeys.hasOwnProperty(action) ) {
            return this.virtualKeys[ action ];
        }
        return false;
    }

    update( time ) {
        if( this.input[ 0 ] ) {
            console.log('VirtualKey %s is set to %s', this.input[ 0 ][ 2 ], this.input[ 0 ][ 1 ]);
            this.virtualKeys[ this.input[ 0 ][ 2 ] ] = this.input[ 0 ][ 1 ] ? false : true;
            this.input.splice(0, 1);
        }

    }

};