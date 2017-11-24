class Personnel {
    
    constructor(token,
                entityKey,
                companyKey, 
                name, 
                lastName, 
                stage,
                specialty,
                comment,
                tariff,
                tariffUnit) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.name = name;
        this.lastName = lastName;
        this.stage = stage;
        this.specialty = specialty;
        this.comment = comment;
        this.tariff = tariff;
        this.tariffUnit = tariffUnit;
    }
    
    toString(){
        
        return JSON.stringify(this);
    };
}

function TokenObject() {
    
    this.token = sessionStorage.token;
    
    this.toJsonString = function () { 
        
        return JSON.stringify(this); 
    };
};

function listPersonnel() {
    
    try{
        
        // alert("token : " + sessionStorage.token);
        var myData = new TokenObject();

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                $("#listPersonnel").empty();
                var totalPersonnel = response.data;
                alert(JSON.stringify(response.data));

                var myListPersonnel = "";

                // Do a forEach even if the array only has one personnel
                totalPersonnel.forEach(function(personnel){

                    //Place the content in the HTML

                    // alert(personnel);

                    myListPersonnel += "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<form action='/personnel' method='GET'>" +
                                                    "<p>" + personnel.name + " " + personnel.lastName + "</p>" + 
                                                    "<p>" + personnel.stage + "</p>" +
                                                    "<p>" + personnel.specialty + "</p>" +
                                                    "<p>" + personnel.comment + "</p>" +
                                                    "<p>" + personnel.tariff + "</p>" +
                                                    "<p>" + personnel.tariffUnit + "</p>" +
                                                    "<input type='hidden' name=customerID value='" + personnel.entityKey + "'/>" +
                                                    "<input type='submit' value='Ver detalle'/>" + 
                                                "</form>" +
                                            "</div>" +
                                        "</div>"
                });

                $("#listPersonnel").append(myListPersonnel);
            },
            error: function (error) {
                
                alert(error);
            }
        });
    }
    catch(error){
        
        alert(error);
    }
}

function getURLVariables() {
    
    var vars = {};
        
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            
        vars[key] = value;
    });
    
    return vars;
}
