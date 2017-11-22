function Customer(companyKey, 
                  email, 
                  name, 
                  lastName, 
                  rfc, 
                  phone) {

    this.companyKey = companyKey;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.rfc = rfc;
    this.phone = phone;
    
    this.toString() = function() {
        
        return JSON.stringify(this);
    };
}
