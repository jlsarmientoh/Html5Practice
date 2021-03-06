Glober.controller.myContacts = function( model, view){
    //Attributes
    this._model = model;
    this._view = view;
    //Self reference
    var _this = this;
    
    this._view.listModified.attach(function( sender, args){
        _this.updateSelected(args.index);
    });
    this._view.addButtonClicked.attach(function( sender, args ){
        _this.addItem( args.item );
    });
    this._view.delButtonClicked.attach(function(){
        _this.delItem();
    });
    this._model.fail.attach(function( sender, args ){
        _this.onError( args.message );
    });
    this._model.success.attach(function( sender, args ){
        _this.onSuccess( args.message );
    });
};

Glober.controller.myContacts.prototype = {
    addItem : function( dto ){        
        if( dto ){
            this._model.addItem( dto );
        }
    },
    
    delItem : function(){
        var index;
        
        index = this._model.getSelectedIndex();
        if( index !== -1 ){
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },
    updateSelected : function( index ){
        this._model.setSelectedIndex( index );
    },    
    onError : function( message ){
        this._view.showError( message );
    },    
    onSuccess : function( message ){
        this._view.showMessage( message );
    }
};    
