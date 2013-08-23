Glober.controller.myContacts = function( model, view){
    //Attributes
    this._model = model;
    this._view = view;
    //Self reference
    var _this = this;
    
    this._view.listModified.attach(function( sender, args){
        _this.updateSelected(args.index);
    });
    this._view.addButtonClicked.attach(function( item ){
        _this.addItem( item );
    });
    this._view.delButtonClicked.attach(function(){
        _this.delItem();
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
    }
};    
