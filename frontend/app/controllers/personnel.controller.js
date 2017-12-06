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
                tariffTimeUnit) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.name = name;
        this.lastName = lastName;
        this.stage = stage;
        this.specialty = specialty;
        this.comment = comment;
        this.tariff = tariff;
        this.tariffTimeUnit = tariffTimeUnit;
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

function createPersonnel() {
    
    var myName = $('#name').val();
    var myLastName = $('#lastName').val();
    var myStage = $('#stage').val();
    var mySpecialty = $('#specialty').val();
    var myComment = $('#comment').val();
    var myTariff = $('#tariff').val();
    var myTariffUnit = $('#tariffTimeUnit').val();

    var personnel = new Personnel();
    personnel.name = myName;
    personnel.lastName = myLastName;
    personnel.stage = myStage;
    personnel.specialty = mySpecialty;
    personnel.comment = myComment;
    personnel.tariff = myTariff;
    personnel.tariffTimeUnit = myTariffUnit;

    alert(personnel.toString());

    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/insert",
            data: personnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The personnel was successfully created.");
                window.location = "/myPersonnel";
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

function deletePersonnel() {
    
    var urlVariables = getURLVariables();
    var personnelKey = urlVariables.personnelID;

    var personnel = new Personnel();
    personnel.entityKey = personnelKey;

    alert(personnel.toString());

    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/delete",
            data: personnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The personnel was successfully deleted.");
                window.location = "/myPersonnel";
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

function editPersonnel() {
    
    var urlVariables = getURLVariables();

    var myName = $('#name').val();
    var myLastName = $('#lastName').val();
    var myStage = $('#stage').val();
    var mySpecialty = $('#specialty').val();
    var myComment = $('#comment').val();
    var myTariff = $('#tariff').val();
    var myTariffUnit = $('#tariffTimeUnit').val();

    var personnel = new Personnel();
    personnel.entityKey = urlVariables.personnelID;
    personnel.name = myName;
    personnel.lastName = myLastName;
    personnel.stage = myStage;
    personnel.specialty = mySpecialty;
    personnel.comment = myComment;
    personnel.tariff = myTariff;
    personnel.tariffTimeUnit = myTariffUnit;

    alert(personnel.toString());
    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/update",
            data: personnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The personnel was successfully updated.");
                window.location = "/myPersonnel";
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

function getPersonnel() {
    
    try{

        var urlVariables = getURLVariables();
        var personnelKey = urlVariables.personnelID;
        alert("personnelKey = " + personnelKey);
        var myPersonnel = new Personnel(token = sessionStorage.token,
                                        entityKey = personnelKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/get",
            data: myPersonnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");

                $("#singlePersonnel").empty();
                totalPersonnel = response.data;

                $("#name").empty();
                $("#lastName").empty();
                $("#specialty").empty();
                $("#comment").empty();
                $("#tariff").empty();

                var myPersonnel = "";

                // Do a forEach even if the array only has one personnel
                totalPersonnel.forEach(function(personnel){

                    //add data to the form
                    $("#name").val(personnel.name);
                    $("#lastName").val(personnel.lastName);
                    $("#stage option[value=" + personnel.stage + "]").attr('selected', 'selected');
                    $("#specialty").val(personnel.specialty);
                    $("#comment").val(personnel.comment);
                    $("#tariff").val(personnel.tariff);
                    $("#tariffTimeUnit option[value=" + personnel.tariffTimeUnit + "]").attr('selected', 'selected');

                    //Place the content in the HTML

                    myPersonnel +=  "<div class='hero-element'>" +
                                        "<div class='box'>" +
                                            "<div class='box-name'><p>" + personnel.name + " " + personnel.lastName + "</p></div>" + 
                                            "<div class='box-content'>" + 
                                                "<p>" + personnel.stage + "</p>" +
                                                "<p>" + personnel.specialty + "</p>" +
                                                "<p>" + personnel.comment + "</p>" +
                                                "<p>" + personnel.tariff + " / " + personnel.tariffTimeUnit + "</p>" +
                                                "<p> <br> </p>" +
                                                "<p><a href='javascript:showForm();' class='btn-rectangle btn-blue'>Editar</a></p>" +
                                            "</div>" + 
                                            "<form action='/personnel' method='GET'>" +
                                                "<input type='hidden' name=personnelID value='" + personnel.entityKey + "'/>" +
                                            "</form>" +
                                        "</div>" +
                                    "</div>"
                });

                myPersonnel +=   "<div class='fixed-buttons'>" + 
                                    "<a onclick='deletePersonnel()' class='big-fixed btn-circle btn-red'><i class='fa fa-minus' aria-hidden='true'></i></a>" +
                                "</div>"

                $("#singlePersonnel").append(myPersonnel);
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

function getPersonnelData() {
    
    try{

        var urlVariables = getURLVariables();
        var personnelKey = urlVariables.personnelID;
        alert("personnelKey = " + personnelKey);
        var myPersonnel = new Personnel(token = sessionStorage.token,
                                      entityKey = personnelKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/get",
            data: myPersonnel.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");
                totalPersonnel = response.data;

                $("#name").empty();
                $("#lastName").empty();
                $("#stage").empty();
                $("#specialty").empty();
                $("#tariff").empty();
                $("#tariffTimeUnit").empty();
                $("#comment").empty();

                // Do a forEach even if the array only has one customer
                totalPersonnel.forEach(function(personnel){

                    alert(personnel.toString());

                    $("#name").val(personnel.name);
                    $("#lastName").val(personnel.lastName);
                    $("#stage option[value=" + personnel.stage + "]").attr('selected', 'selected');
                    $("#specialty").val(personnel.specialty);
                    $("#tariff").val(personnel.tariff);
                    $("#tariffTimeUnit").val(personnel.tariffTimeUnit);
                    $("#comment").val(personnel.comment);
                });
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
                var myListPersonnel = "";

                if(totalPersonnel == null){
                    
                    myListPersonnel += "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<p> No hay personal registrado </p>" + 
                                            "</div>" +
                                        "</div>";
                }

                else{

                    alert(JSON.stringify(response.data));

                    // Do a forEach even if the array only has one personnel
                    totalPersonnel.forEach(function(personnel){
                    
                        //Place the content in the HTML
                        // alert(personnel);

                        myListPersonnel += "<div class='hero-element'>" +
                                                "<div class='box'>" +
                                                    "<form action='/personnel' method='GET'>" +
                                                        "<div class='box-name'><p>" + personnel.name + " " + personnel.lastName + "</p></div>" + 
                                                        "<div class='box-content'>" + 
                                                            "<p>" + personnel.stage + "</p>" +
                                                            "<p>" + personnel.specialty + "</p>" +
                                                            "<p>" + personnel.comment + "</p>" +
                                                            "<p>" + personnel.tariff + " MXN / " + personnel.tariffTimeUnit +"</p>" +
                                                            "<input type='hidden' name=personnelID value='" + personnel.entityKey + "'/>" +
                                                            "<input type='submit' value='Ver detalle'/>" + 
                                                        "</div>" +
                                                    "</form>" +
                                                "</div>" +
                                            "</div>";
                    });
                }

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

function getPersonnelListForSelection() {
    try {

        // alert("token : " + sessionStorage.token);
        var myData = new TokenObject();

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/personnel_api/v1/personnel/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function () {
            },
            success: function (response) {
                var totalPersonnel = response.data;
                var myListPersonnel = "";

                if (totalPersonnel == null)
                    myListPersonnel += "<option>No hay personal disponible</option>";
                else {
                    // Do a forEach even if the array only has one personnel
                    myListPersonnel += "<option disabled><bold>Personal: </bold></option>";
                    totalPersonnel.forEach(function (personnel) {

                        //Place the content in the HTML

                        myListPersonnel += "<option value='" + personnel.entityKey + "'>" + personnel.name + " [" + personnel.specialty + "]</option>";
                    });
                }

                $("#quotationRowResource").append(myListPersonnel);
            },
            error: function (error) {

                alert(error);
            }
        });
    }
    catch (error) {

        alert(error);
    }
}