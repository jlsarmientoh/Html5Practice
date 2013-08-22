/**
*	This Model stores items and notifies
*	observers about changes
*/
Glober.model.contactListModel = function( items ){
	//Attributes
	this._items = items;
	this._selectedIndex = -1;
	this._conn;
	//Events register
	this.itemAdded = new Glober.event.Event( this );
	this.itemRemoved = new Glober.event.Event( this );
	this.selectedIndexChanged = new Glober.event.Event( this );
	//Init method
	this.init = function(){
		this.getConnection();
		this._conn.transaction(function( tx ){
			tx.executeSql("CREATE TABLE CONTACTS( ID REAL UNIQUE, NAME TEXT)", [],
			null,
			this.onError);
		});
	};	
	//Private methods
	this.getConnection = function(){
		if(this._conn == null){
			this._conn = window.openDatabase("DbContacts", "1.0", "My contacts DB", 1 * 1024 * 1024);
		}
	};
	this.addRecord = function(index, item , conn ){
		this._conn.transaction(function(tx){
			tx.executeSql("INSERT INTO CONTACTS(ID, NAME) VALUES(?, ?)", [ index , item],
			null,
			this.onError);
		});
	};
	this.onError = function(tx, error){
		return error.message;
	};
	//call the init method
	this.init();
}

Glober.model.contactListModel.prototype = {
	getItems : function() {
		return [].concat( this._items );
	},
	addItem : function( item ){
		this._items.push( item );
		this.getConnection();
		this.addRecord(( this._items.length + 1 ), item, this._conn);
		this.itemAdded.notify({ item : item });
	},
	removeItemAt : function( index ){
		var item;
		
		item = this._items[index];
		this._items.splice( index, 1);
		this.itemRemoved.notify({ item : item});
		if( index === this._selectedIndex){
			this.setSelectedIndex(-1)
		}
	},
	getSelectedIndex : function(){
		return this._selectedIndex;
	},
	setSelectedIndex : function( index ){
		var previousIndex;
		
		previousIndex = this._selectedIndex;
		this._selectedIndex = index;
		this.selectedIndexChanged.notify({ previous : previousIndex});
	}
};