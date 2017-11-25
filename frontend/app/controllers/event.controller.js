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
    
    function listTools() {
        
        try {
            
            var myData = new TokenObject();
            
            jQuery.ajax( {
                type: "POST",
                url: "http://localhost:8080/_ah/api/tool_api/v1/tool/list",
                data: myData.toJsonString(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                before: function(){
                    // $(".msg").html("<p>Esperando respuesta...</p>");
                },
                success: function (response) {
                    
                    // $(".msg").html("<p>Message</p>");
                    $("#listTools").empty();
                    var totalTools = response.data;
                    var myListTools = "";
    
                    if(totalTools == null){
                    
                        myListTools +=  "<div class='hero-element'>" +
                                            "<div class='hero-content-inner'>" +
                                                "<p> No hay herramientas registradas </p>" + 
                                            "</div>" +
                                        "</div>"
                    }
    
                    else{
    
                        alert(JSON.stringify(response.data));
                        // Do a forEach even if the array only has one tool
                        totalTools.forEach(function(tool){
                            
                            //Place the content in the HTML
                            // alert(tool);
                            tableString += "<div class='box'> \n" +
                                            "\t<div class='box-name'>\n" +
                                            "\t\t<p>" + tool.id + " " + tool.model +"</p>" +
                                            "\t</div>" +
                                            "\t<div class='box-content'>\n" +
                                            "\t\t<p>Categoria: " + tool.category + "</p>" +
                                            "\t\t<p>Tipo: " + tool.type + "</p>" +
                                            "\t\t<p>Marca: " + tool.brand + "</p>" +
                                            "\t\t<p>Costo por dia: " + tool.costPerDay + "</p>" +
                                            "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                            "\t\t<p>Disponibles: " + tool.available + "</p>" +
                                            "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                            "\t</div>" +
                                            "</div>";
                        });
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
    