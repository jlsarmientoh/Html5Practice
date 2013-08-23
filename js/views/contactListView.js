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
    this._elements.list.change(function( e ){
        _this.listModified.notify({ index : e.target.selectedIndex });
    });
    this._elements.addButton.click(function(){
        var dto = new Glober.model.dto.Contact();
        
        dto.setName(_this._elements.form.find('#name').value);
        dto.setAddress(_this._elements.form.find('#address').value);
        dto.setPhone(_this._elements.form.find('#phone').value);
        dto.setCellPhone(_this._elements.form.find('#cellPhone').value);
        dto.setEmail(_this._elements.form.find('#email').value);
        
        _this.addButtonClicked.notify( dto );
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
                list.append($('<option>' + items[key].getName() + '</option>'));
            }
        }
        this._model.setSelectedIndex( -1 );
    }
};