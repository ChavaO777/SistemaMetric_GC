function Personnel(companyKey, 
                   name, 
                   lastName, 
                   stage,
                   specialty,
                   comment,
                   tariff,
                   tariffUnit) {

    this.companyKey = companyKey;
    this.name = name;
    this.lastName = lastName;
    this.stage = stage;
    this.specialty = specialty;
    this.comment = comment;
    this.tariff = tariff;
    this.tariffUnit = tariffUnit;

    this.toString() = function() {

        return JSON.stringify(this);
    };
}