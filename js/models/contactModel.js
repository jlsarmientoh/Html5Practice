/**
*   This Model stores items and notifies
*   observers about changes
*/
Glober.model.contactListModel = function(){
    //Attributes
    this._items = [];
    this._selectedIndex = -1;
    this._conn;
    //Events register
    this.itemAdded = new Glober.event.Event( this );
    this.itemRemoved = new Glober.event.Event( this );
    this.selectedIndexChanged = new Glober.event.Event( this );
    //Self referenced this
    var _this = this;
    //Init method
    this.init = function(){
        this.getConnection();
        this._conn.transaction(function( tx ){
            tx.executeSql("CREATE TABLE CONTACTS( ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, NAME TEXT, ADDRESS TEXT, PHONE TEXT, CELLPHONE TEXT, EMAIL TEXT)", [],
            null,
            _this.onError);
        });
    };    
    //Private methods
    this.getConnection = function(){
        if(this._conn == null){
            this._conn = window.openDatabase("DbContacts", "1.0", "My contacts DB", 1 * 1024 * 1024);
        }
    };
    this.addRecord = function( dto ){
        this.getConnection();
        this._conn.transaction(function(tx){
            tx.executeSql("INSERT INTO CONTACTS(NAME, ADDRESS, PHONE, CELLPHONE, EMAIL) VALUES(?, ?, ?, ?, ?)",
            [
            dto.getName(),
            dto.getAddress(),
            dto.getPhone(),
            dto.getCellPhone(),
            dto.getEmail()
            ],
            null,
            _this.onError);
        });
    };
    this.deleteRecord = function( id ){
        this.getConnection();
        this._conn.transaction(function(tx){
            tx.executeSql("DELETE FROM CONTACTS WHERE ID = ?",
            [id],
            null,
            _this.onError);
        });
    };
    this.updateRecord = function( dto ){
        this.getConnection();
        this._conn.transaction(function(tx){
            tx.executeSql("UPDATE TABLE CONTACTS NAME = ?, ADDRESS = ?, PHONE = ?, CELLPHONE = ?, EMAIL = ? WHERE ID = ?",
            [
            dto.getName(),
            dto.getAddress(),
            dto.getPhone(),
            dto.getCellPhone(),
            dto.getEmail(),
            dto.getId(),
            ],
            null,
            _this.onError);
        });
    };
    this.getRecords = function(){
        this.getConnection();
        this._conn.transaction(function(tx){
            tx.executeSql("SELECT ID, NAME, ADDRESS, PHONE, CELLPHONE, EMAIL FROM CONTACTS",
            [],
            _this.onSuccess,
            _this.onError);
        });
    };
    this.onError = function( tx, error ){
        return error.message;
    };
    this.onSuccess = function( tx, result){
        var length = result.rows.length,
            i,
            dto;
            
        _this._items.length = 0;
        
        for( i = 0; i < length; i++){
            dto = new Glober.model.dto.Contact();
            dto.setId(result.rows.item(i).ID);
            dto.setName(result.rows.item(i).NAME);
            dto.setAddress(result.rows.item(i).ADDRESS);
            dto.setPhone(result.rows.item(i).PHONE);
            dto.setCellPhone(result.rows.item(i).CELLPHONE);
            dto.setEmail(result.rows.item(i).EMAIL);
            
            _this._items.push( dto );
        }
    };
    //call the init method
    this.init();
};

Glober.model.contactListModel.prototype = {
    getItems : function() {
        this.getRecords();
        return [].concat( this._items );
    },
    addItem : function( dto ){
        this._items.push( dto );
        this.addRecord( dto );
        this.itemAdded.notify({ item : dto });
    },
    removeItemAt : function( index ){
        var item;
        
        item = this._items[index];
        this.deleteRecord( item.getId() );
        this._items.splice( index, 1 );
        this.itemRemoved.notify({ item : item});
        if( index === this._selectedIndex){
            this.setSelectedIndex(-1 )
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