class Event {
    
    constructor(token,
                entityKey,
                companyKey, 
                date, 
                days, 
                place, 
                hidden) {

        this.token = sessionStorage.token;
        this.entityKey = entityKey;
        this.companyKey = companyKey;
        this.date = date;
        this.days = days;
        this.place = place;
        this.hidden = hidden;
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

function listEvents() {
    
    try {
        
        var myData = new TokenObject();
        
        jQuery.ajax( {
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/event/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                
                // $(".msg").html("<p>Message</p>");
                $("#listEvents").empty();
                var totalEvents = response.data;
                var myListEvents = "";

                if(totalEvents == null){
                
                    myListEvents +=  "<div class='hero-element'>" +
                                        "<div class='hero-content-inner'>" +
                                            "<p> No hay herramientas registradas </p>" + 
                                        "</div>" +
                                    "</div>"
                }

                else{

                    console.log(JSON.stringify(response.data));
                    // Do a forEach even if the array only has one tool
                    
                }
            
                $("#listEvents").append(myListTools);
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
    