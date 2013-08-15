var Glober = Glober || {};
	Glober.controller = Glober.controller || {};
	Glober.model = Glober.model || {};
	Glober.view = Glober.view || {};
	Glober.event = Glober.event || {};

/**
* Event object
*/
Glober.event.Event = function ( sender ){
	this._sender = sender;
	this._listeners = [];
}

Glober.event.Event.prototype = {
	attach : function ( listener ){
		this._listeners.push( listener );
	},
	notify : function ( args ){
		var index,
			length;
		
		length = this._listeners.length;
		
		for( index = 0; index < length; index += 1 ){
			this._listeners[index]( this._sender, args );
		}
	}
};