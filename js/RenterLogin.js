import * as checker from "./util.js";
import Preventer from "./main.js";

Preventer();

//Renter Login form
const Form = document.getElementById("Login");

const Username_EmailNode = document.getElementById("Username_email");
const PassNode = document.getElementById("pass");

Form.addEventListener("submit", RenterLogin);

function RenterLogin(e) {
  e.preventDefault();

  if (checkInput()) {
    let Username_Email = Username_EmailNode.value;
    let Pass = PassNode.value;

    Send_Renter(Username_Email, Pass);
  }
}

//Send POST to php via AJAX
function Send_Renter(Username_Email, Pass) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/Login.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let renter = PhpResponse(xhr.responseText);

      if (renter !== "") {
        //holdeing renter JSON Object

        sessionStorage.setItem("renter", renter);
        location.replace("./index.html");
      }
    }
  };

  //set the parameters to send it as JSON
  var prams = `Renter-Login=& Username_Email=${Username_Email}&password=${Pass}`;

  xhr.send(prams);
}

//to process the php response
function PhpResponse(response) {
  let error = false;

  if (response === "Wrong Username or Email") {
    checker.setErrorFor(
      Username_EmailNode,
      "No User with this Username or Email"
    );
    error = true;
  } else {
    checker.setSuccessFor(Username_EmailNode);
  }

  if (response === "Wrong Password") {
    checker.setErrorFor(PassNode, "Wrong Password");
    error = true;
  }

  //return the respose so sessionStorege can work with it
  return !error ? response : "";
}

function checkInput() {
  let Valid = true;

  //Loging with email or Username
  if (String(Username_EmailNode.value).indexOf("@") > -1) {
    if (!checker.ValidEmail(Username_EmailNode)) {
      Valid = false;
    }
  } else {
    if (!checker.ValidUserName(Username_EmailNode)) {
      Valid = false;
    }
  }

  //Password
  if (!checker.ValidPass(PassNode)) {
    Valid = false;
  }

  return Valid;
}
