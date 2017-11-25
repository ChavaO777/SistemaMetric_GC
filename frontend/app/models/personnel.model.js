function Personnel(companyKey, 
                   name, 
                   lastName, 
                   stage,
                   specialty,
                   comment,
                   tariff,
                   tariffTimeUnit) {

    this.companyKey = companyKey;
    this.name = name;
    this.lastName = lastName;
    this.stage = stage;
    this.specialty = specialty;
    this.comment = comment;
    this.tariff = tariff;
    this.tariffTimeUnit = tariffTimeUnit;

    this.toString() = function() {

        return JSON.stringify(this);
    };
}