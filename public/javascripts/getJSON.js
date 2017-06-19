//var http = require("http");

function getSemesterFile(semester) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("CHUPA MINHA PIÇA");
            console.log(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", 'http://localhost:3000/voting/'+semester, true);
    xhttp.send();
    /*request("2013-1", function(err, response, body){

    });*/
}