Glober.view.contactListView = function ( model, elements ){
    //Attributes
    this._model = model;
    this._elements = elements;
    //Event register
    this.listModified = new Glober.event.Event( this );
    this.addButtonClicked = new Glober.event.Event( this );
    this.delButtonClicked = new Glober.event.Event( this ) ;
    
    var _this = this;
    
    //Model listeners
    this._model.itemAdded.attach(function(){
        _this.rebuildList();
    });
    this._model.itemRemoved.attach(function(){
        _this.rebuildList();
    });
    
    //attach listeners to HTML controls
    this._elements.list.selectable({
        stop: function(){
            $('.ui-selected', this).each(function(){
                var selectedIndex = $('#selectable li').index( this );
                _this.listModified.notify({ index : selectedIndex });
            });
        }
    });
    this._elements.addButton.click(function(){
        var dto = new Glober.model.dto.Contact();
        
        if(Glober.util.validations.validateForm(_this._elements.form)){
        
            dto.setName(_this._elements.form.find('#name').val());
            dto.setAddress(_this._elements.form.find('#address').val());
            dto.setPhone(_this._elements.form.find('#phone').val());
            dto.setCellPhone(_this._elements.form.find('#cellPhone').val());
            dto.setEmail(_this._elements.form.find('#email').val());
            
            _this.addButtonClicked.notify( { item : dto} );
        }
    });
    this._elements.delButton.click(function(){        
        _this.delButtonClicked.notify();
    });
};

Glober.view.contactListView.prototype = {
    show : function(){
        this.rebuildList();
    },    
    rebuildList : function(){
        var list,
            items,
            key;
            
        list = this._elements.list;
        list.html('');
        
        items = this._model.getItems();
        for( key in items ){
            if( items.hasOwnProperty( key ) ){
                list.append($('<li class=\"ui-widget-content\"">' + items[key].getName() + '</li>'));
            }
        }
        this._model.setSelectedIndex( -1 );
        Glober.util.clearFields( this._elements.form ) ;
    },
    showMessage : function( message ){
        this._elements.successPopup.dialog({
            dialogClass : "no-close",
            buttons : [
                {
                    text : "OK",
                    click : function(){
                        $(this).dialog("close");
                    }
                }
            ]
        });
        this._elements.successPopup.find("p.msg").text( message);
    },
    showError : function( message ){
        this._elements.errorPopup.dialog({
            dialogClass : "no-close",
            buttons : [
                {
                    text : "OK",
                    click : function(){
                        $(this).dialog("close");
                    }
                }
            ]
        });
        this._elements.errorPopup.find("p.msg").text( message);
    }
};