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
    xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/deputies', true);
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
    xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/voting/'+semester, true);
    //xhttp.open("GET", 'http://localhost:3000/voting/'+semester, true);
    xhttp.send();
    /*request("2013-1", function(err, response, body){

    });*/
}

rollCallData.PCAData = function getPCAData(semester, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("CHUPA MINHA PIÇA");
            //console.log(JSON.parse(xhttp.responseText));
            //return JSON.parse(xhttp.responseText);
            callback(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/PCA/'+semester, true);
    //xhttp.open("GET", 'http://localhost:3000/PCA/'+semester, true);
    xhttp.send();
}

rollCallData.MDSData = function getMDSData(semester, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("CHUPA MINHA PIÇA");
            //console.log(JSON.parse(xhttp.responseText));
            //return JSON.parse(xhttp.responseText);
            callback(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/MDS/'+semester, true);
    //xhttp.open("GET", 'http://localhost:3000/MDS/'+semester, true);
    xhttp.send();
}

rollCallData.SammonData = function getSammonData(semester, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("CHUPA MINHA PIÇA");
            //console.log(JSON.parse(xhttp.responseText));
            //return JSON.parse(xhttp.responseText);
            callback(JSON.parse(xhttp.responseText))
        }
    };
    xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/Sammon/'+semester, true);
    //xhttp.open("GET", 'http://localhost:3000/Sammon/'+semester, true);
    xhttp.send();
}

rollCallData.semesterList = function getSemesterList(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log("CHUPA MINHA PIÇA");
            //console.log(JSON.parse(xhttp.responseText));
            //return JSON.parse(xhttp.responseText);
            callback(JSON.parse(xhttp.responseText))
        }
    };
    //xhttp.open("GET", 'http://dimreductiondeputies.herokuapp.com/semesterList', true);
    xhttp.open("GET", 'http://localhost:3000/semesterList', true);
    xhttp.send();
}