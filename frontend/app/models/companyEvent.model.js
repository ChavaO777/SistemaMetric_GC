class CompanyEvent {
    
    constructor(token,
                entityKey,
                companyKey, 
                customerKey,
                name,
                description,
                date, 
                days, 
                place, 
                hidden) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.customerKey = customerKey;
        this.name = name;
        this.description = description;
        this.date = date;
        this.days = days;
        this.place = place;
        this.hidden = hidden;
    }

    toString(){
        
        return JSON.stringify(this);
    };
}