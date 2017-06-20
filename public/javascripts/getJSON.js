//var http = require("http");
"use strict";

var rollCallData = (typeof exports === "undefined")?(function rollCallData() {}):(exports);
if(typeof global !== "undefined") { global.rollCallData = rollCallData; }

rollCallData.deputiesList = function getDeputiesList(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("ALENTA PORRA");
            //console.log(JSON.parse(xhttp.responseText));
            callback(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", 'http://localhost:3000/deputies', true);
    xhttp.send();
}

rollCallData.semesterFile = function getSemesterFile(semester, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("CHUPA MINHA PIÇA");
            //console.log(JSON.parse(xhttp.responseText));
            //return JSON.parse(xhttp.responseText);
            callback(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", 'http://localhost:3000/voting/'+semester, true);
    xhttp.send();
    /*request("2013-1", function(err, response, body){

    });*/
}