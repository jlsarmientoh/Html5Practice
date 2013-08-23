/**
* Contact DTO
*/
Glober.model.dto.Contact = function(){
    //Attributes
    this.id;
    this.name;
    this.address;
    this.phone;
    this.cellPhone;
    this.email;
};
//Getters and Setters
Glober.model.dto.Contact.prototype = {
    getId : function(){
        return this.id;
    },
    setId : function( value ){
        this.id = value;
    },
    getName : function(){
        return this.name;
    },
    setName : function( value ){
        this.name = value;
    },
    getAddress : function(){
        return this.address;
    },
    setAddress : function( value ){
        this.address = value;
    },
    getPhone : function(){
        return this.phone;
    },
    setPhone : function( value ){
        this.phone = value;
    },
    getCellPhone : function(){
        return this.cellPhone;
    },
    setCellPhone : function( value ){
        this.cellPhone = value;
    },
    getEmail : function(){
        return this.email;
    },
    setEmail : function( value ){
        this.email = value;
    }
}