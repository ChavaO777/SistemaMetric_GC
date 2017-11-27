function Personnel(userKey, 
                   eventKey,
                   iD,
                   date,
                   isFinal,
                   subtotal,
                   revenueFactor,
                   iva,
                   discount,
                   total,
                   metricPlus,
                   version){
    
    this.userKey = userKey;
    this.eventKey = eventKey;
    this.iD = iD;
    this.date = date;
    this.isFinal = isFinal;
    this.subtotal = subtotal;
    this.revenueFactor = revenueFactor;
    this.iva = iva;
    this.discount = discount;
    this.total = total;
    this.metricPlus = metricPlus;
    this.version = version;

    this.toString() = function() {

        return JSON.stringify(this);
    };
}