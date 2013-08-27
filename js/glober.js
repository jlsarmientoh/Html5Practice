var Glober = Glober || {};
    Glober.controller = Glober.controller || {};
    Glober.model = Glober.model || {};
    Glober.view = Glober.view || {};
    Glober.event = Glober.event || {};
    Glober.model.dto = Glober.model.dto || {};
    Glober.util = Glober.util || {};
    Glober.util.validations = 
    

/**
* Event object
*/
Glober.event.Event = function( sender ){
    this._sender = sender;
    this._listeners = [];
};

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

Glober.util.validations = function(){        
};
/**
* Validation utilities
*/
Glober.util.validations.validateEmptyFields = function( form ){
   var $fields = form.find('[data-required="true"]'),
       isValid = true;
       
    $fields.each(function( index ){
        var $field = $(this);
        if( $field.val() == '' ){
            isValid = false;
            $field.addClass( "errorField");                
        }else{
            $field.removeClass( "errorField");                
        }
    });
    
    return isValid;
};

Glober.util.validations.validateFormatFields = function( form ){
   var $fields = form.find('[data-pattern]'),
       isValid = true;
       
    $fields.each(function( index ){
        var $field = $(this),
            regex = new RegExp($field.attr('pattern'));
            
            regex.compile();
            
        if( !regex.test( $field.val() ) ){
            isValid = false;
            $field.addClass( "errorField");                
        }else{
            $field.removeClass( "errorField");                
        }
    });
    
    return isValid;
};

Glober.util.validations.validateForm = function ( form ){
    var isValid = true,
        areRequiredFieldsValid = true,
        areFormatFieldsValid = true;
    
    areRequiredFieldsValid = Glober.util.validations.validateEmptyFields( form );
    areFormatFieldsValid = Glober.util.validations.validateFormatFields( form );
    
    return ( areRequiredFieldsValid && areFormatFieldsValid );
};
/**
* Miscellaneous
*/
Glober.util.clearFields = function ( form ) {
    var $fields = form.find(':input');
    
    $fields.each(function( index ){
        var $field = $(this);
        
        $field.val('');
    });
};