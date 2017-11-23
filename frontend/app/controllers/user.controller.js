//import {User} from '../models/user.model'
function User() {
    this.email = null;
    this.password = null;
    this.name = null;
    this.lastName = null;
    this.toJsonString = function () {
      return JSON.stringify(this);
    };
}
function login() {
  var user = new User();
  user.email = $("#email").val();
  user.password = $("#password").val();
  alert(user.toJsonString());
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/_ah/api/user_api/v1/user/login",
        data: user.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
            sessionStorage.clear();
            if(response.token == undefined){
                $(".msg").html("<p>Datos incorrectos</p>");
            }
            else{
                sessionStorage.token = response.token;
                $(".msg").html("<p>" + sessionStorage.token + "</p>");
                window.location = "/";
            }
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
function create() {
  var user = new User();
  user.email = $("#email").val();
  user.password = $("#password").val();
  user.name = $("#name").val();
  user.lastName = $("#lastName").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/create",
        data: user.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("<p>Usuario creado</p>");
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
  var users;
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/list",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
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
function list() {
  var users;
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/list",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          users = response;
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
  var user;
  var email = $("#email").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/get",
        data: {email : email},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          user = new User();
          user.email = response['email'];
          user.password = response['password'];
          user.name = response['name'];
          user.lastName = response['lastName'];
          $(".msg").html(user.toJsonString());
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
  var user = new User();
  user.email = $("#email").val();
  user.password = $("#password").val();
  user.name = $("#name").val();
  user.lastName = $("#lastName").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/update",
        data: user.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html(user.toJsonString());
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
function remove() {
  var email = $("#email").val();
  try{
    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/backend/apis/public/user/delete",
        data: {email : email},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        before: function(){
            $(".msg").html("<p>Esperando respuesta...</p>");
        },
        success: function (response) {
          $(".msg").html("usuario eliminado");
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
