class Customer {
    
    constructor(token,
                entityKey,
                companyKey, 
                email, 
                name, 
                lastName, 
                rfc, 
                phone) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.rfc = rfc;
        this.phone = phone;
    }

    toString(){
        
        return JSON.stringify(this);
    };
}
