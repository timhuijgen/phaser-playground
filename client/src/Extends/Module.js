'use strict';

module.exports = class Module {

    constructor( data = {} )
    {
        this.dataValues = data;
    }

    get( key )
    {
        if( this.dataValues.hasOwnProperty(key) ) {
            return this.dataValues[ key ];
        }
        return null;
    }

    set( key, value )
    {
        this.dataValues[ key ] = value;

        return this;
    }

    getAll()
    {
        return this.dataValues;
    }

    setAll( data )
    {
        this.dataValues = data;

        return this;
    }
};