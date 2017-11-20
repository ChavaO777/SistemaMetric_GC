//import {Tool} from '../models/tool.model'
function create() {
  var tool = new Tool();
  tool.id = $('#id').val();
  tool.category = $('#category').val();
  tool.type = $('#type').val();
  tool.brand = $('#brand').val();
  tool.model = $('#model').val();
  tool.pricePerDay = $('#pricePerDay').val();
  tool.quantity = $('#quantity').val();
  tool.available = $('#available').val();
  tool.comment = $('#comment').val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/create",
        data: tool.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("<p>Herramienta creado</p>");
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
function list() {
  var tools;
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/list",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          tools = response;
          $(".msg").html(response);
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
function get() {
  var tool;
  var id = $("#id").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/get",
        data: {id : id},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          var tool = new Tool();
          tool.id = $('#id').val();
          tool.category = $('#category').val();
          tool.type = $('#type').val();
          tool.brand = $('#brand').val();
          tool.model = $('#model').val();
          tool.pricePerDay = $('#pricePerDay').val();
          tool.quantity = $('#quantity').val();
          tool.available = $('#available').val();
          tool.comment = $('#comment').val();
          $(".msg").html(tool.toJsonString());
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
function update() {
  var tool = new Tool();
  tool.id = $('#id').val();
  tool.category = $('#category').val();
  tool.type = $('#type').val();
  tool.brand = $('#brand').val();
  tool.model = $('#model').val();
  tool.pricePerDay = $('#pricePerDay').val();
  tool.quantity = $('#quantity').val();
  tool.available = $('#available').val();
  tool.comment = $('#comment').val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/update",
        data: tool.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html(tool.toJsonString());
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
function delete() {
  var id = $("#id").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/tool/delete",
        data: {id : id},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("Herramienta eliminado");
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
