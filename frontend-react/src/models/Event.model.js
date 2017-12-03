export default class Event{
    constructor(token,
                entityKey,
                companyKey,
                customerKey,
                name,
                description,
                date,
                days,
                place,
                hidden){
        this.token = localStorage.getItem('token');
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

    toJsonString() {
        return JSON.stringify(this);
    }
}