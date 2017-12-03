//import {Tool} from '../models/tool.model'
class Tool {
  constructor(token,
              entityKey,
              companyKey,
              category,
              kind,
              brand,
              model,
              tariff,
              tariffTimeUnit,
              quantity,
              availableQuantity,
              comment) {
    this.token = sessionStorage.token;
    this.entityKey = entityKey;
    this.companyKey = companyKey;
    this.category = category;
    this.kind = kind;
    this.brand = brand;
    this.model = model;
    this.tariff = tariff;
    this.tariffTimeUnit = tariffTimeUnit;
    this.quantity = quantity;
    this.availableQuantity = availableQuantity;
    this.comment = comment;
  }
  toString() {
    return JSON.stringify(this);
  }
}
function TokenObject() {

    this.token = sessionStorage.token;

    this.toJsonString = function () {

        return JSON.stringify(this);
    };
}
function getURLVariables() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function createTool() {
  var tool = new Tool();
  tool.id = $('#id').val();
  tool.category = $('#category').val();
  tool.kind = $('#kind').val();
  tool.brand = $('#brand').val();
  tool.model = $('#model').val();
  tool.tariff = $('#tariff').val();
  tool.tariffTimeUnit = $('#tariffTimeUnit').val();
  tool.quantity = $('#quantity').val();
  tool.availableQuantity = $('#availableQuantity').val();
  tool.comment = $('#comment').val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/_ah/api/tool_api/v1/tool/insert",
        data: tool.toString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            //$(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          alert("The tool was successfully created." + tool.toString());
          window.location = "/myTools";
        },
        error: function (error) {
            alert(error);
        }
    });
  }
  catch(error){
    alert('jQuery failed : '  + error);
  }
}
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
                        myListTools += "<div class='box'> \n" +
                                        "\t<div class='box-name'>\n" +
                                        "\t\t<p>" + tool.brand  + " - " +tool.model +"</p>" +
                                        "\t</div>" +
                                        "\t<div class='box-content'>\n" +
                                        "\t\t<p>Categoria: " + tool.category + "</p>" +
                                        "\t\t<p>Tipo: " + tool.kind + "</p>" +
                                        "\t\t<p>Marca: " + tool.brand + "</p>" +
                                        "\t\t<p>Modelo: " + tool.model + "</p>" +
                                        "\t\t<p>Costo: " + tool.tariff + "</p>" +
                                        "\t\t<p>Por: " + (tool.tariffTimeUnit == 'day' ? 'Dia' : 'Hora') + "</p>" +
                                        "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                        "\t\t<p>Disponibles: " + tool.availableQuantity + "</p>" +
                                        "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                        "\t<form action='/tool' method='GET'>\n" +
                                        "<input type='hidden' name=toolID value='"+ tool.entityKey + "'/>" +
                                        "<input type='submit' value='Ver detalle' class='btn-rectangle btn-blue'/>" +
                                        "\t</form>" +
                                        "\t</div>" +
                                        "</div>";
                    });
                }

                $("#listTools").append(myListTools);
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
function getTool() {
    try{
        var urlVariables = getURLVariables();
        var toolKey = urlVariables.toolID;
        alert("toolKey = " + toolKey);
        var myTool = new Tool(token = sessionStorage.token,
                                      entityKey = toolKey);
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/tool/get",
            data: myTool.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Message</p>");
                $("#singleTool").empty();
                $("#id").empty();
                $("#category").empty();
                $("#kind").empty();
                $("#brand").empty();
                $("#model").empty();
                $("#tariff").empty();
                $("#quantity").empty();
                $("#availableQuantity").empty();
                $("#comment").empty();
                totalTools = response.data;
                var myTool = "";
                // Do a forEach even if the array only has one tool
                totalTools.forEach(function(tool){
                    //add data to the form
                    $("#id").val(tool.id);
                    $("#category").val(tool.category);
                    $("#kind").val(tool.kind);
                    $("#brand").val(tool.brand);
                    $("#model").val(tool.model);
                    $("#tariff").val(tool.tariff);
                    $("#tariffTimeUnit option[value=" + tool.tariffTimeUnit + "]").attr('selected', 'selected');
                    $("#quantity").val(tool.quantity);
                    $("#availableQuantity").val(tool.availableQuantity);
                    $("#comment").val(tool.comment);
                    //Place the content in the HTML
                    // alert(tool);
                    myTool += "<div class='box'> \n" +
                                    "\t<div class='box-name'>\n" +
                                    "\t\t<p>" + tool.brand  + " - " +tool.model +"</p>" +
                                    "\t</div>" +
                                    "\t<div class='box-content'>\n" +
                                    "\t\t<p>Categoria: " + tool.category + "</p>" +
                                    "\t\t<p>Tipo: " + tool.kind + "</p>" +
                                    "\t\t<p>Marca: " + tool.brand + "</p>" +
                                    "\t\t<p>Modelo: " + tool.model + "</p>" +
                                    "\t\t<p>Costo: " + tool.tariff + "</p>" +
                                    "\t\t<p>Por: " + (tool.tariffTimeUnit == 'day' ? 'Dia' : 'Hora') + "</p>" +
                                    "\t\t<p>Existencias: " + tool.quantity + "</p>" +
                                    "\t\t<p>Disponibles: " + tool.availableQuantity + "</p>" +
                                    "\t\t<p>Comentarios: " + tool.comment + "</p>" +
                                    "<p><a href='javascript:showForm();' class='btn-rectangle btn-blue'>Editar</a></p>"+
                                    "\t<form action='/tool' method='GET'>\n" +
                                    "<input type='hidden' name=toolID value='"+ tool.entityKey + "'/>" +
                                    "\t</form>" +
                                    "\t</div>" +
                                    "</div>";
                });
                $("#singleTool").append(myTool);
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
function deleteTool() {
    var urlVariables = getURLVariables();
    var toolKey = urlVariables.toolID;
    var tool = new Tool();
    tool.entityKey = toolKey;
    alert(tool.toString());
    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/tool/delete",
            data: tool.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The tool was successfully deleted.");
                window.location = "/myTools";
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
function editTool() {

    var urlVariables = getURLVariables();
    var tool = new Tool();
    tool.entityKey = urlVariables.toolID;
    tool.category = $('#category').val();
    tool.kind = $('#kind').val();
    tool.brand = $('#brand').val();
    tool.model = $('#model').val();
    tool.tariff = $('#tariff').val();
    tool.tariffTimeUnit = $('#tariffTimeUnit').val();
    tool.quantity = $('#quantity').val();
    tool.availableQuantity = $('#availableQuantity').val();
    tool.comment = $('#comment').val();
    alert(tool.toString());
    try{
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/tool_api/v1/tool/update",
            data: tool.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            before: function(){
                // $(".msg").html("<p>Esperando respuesta...</p>");
            },
            success: function (response) {
                // $(".msg").html("<p>Herramienta creado</p>");
                alert("The tool was successfully updated.");
                window.location = "/myTools";
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
