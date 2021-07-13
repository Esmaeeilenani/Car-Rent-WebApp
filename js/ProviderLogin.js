import * as checker from "./util.js";
import Preventer from "./main.js";
import Provider, { parsProvider } from "./classes/Provider.js";

Preventer();

//Provider Login form
const Form = document.getElementById("Login");

const CNameNode = document.getElementById("CName");
const PassNode = document.getElementById("pass");

Form.addEventListener("submit", ProviderLogin);

function ProviderLogin(e) {
  e.preventDefault();

  if (checkInput()) {
    let CName = CNameNode.value;
    let Pass = PassNode.value;

    Send_Provider(CName, Pass);
  }
}

//Send POST to php via AJAX
function Send_Provider(CName, Pass) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/Login.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let provider = PhpResponse(xhr.responseText);

      if (provider !== "") {
        //holdeing renter JSON Object
        sessionStorage.setItem("provider", provider);
        location.replace("./index.html");
      }
    }
  };

  //set the parameters to send it as JSON
  var prams = `Provider-Login=&CompanyName=${CName}&password=${Pass}`;

  xhr.send(prams);
}

//to process the php response
function PhpResponse(response) {
  let error = false;

  if (response === "nocompany") {
    checker.setErrorFor(CNameNode, "No Company with this Name");
    error = true;
  } else {
    checker.setSuccessFor(CNameNode);
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

  if (!checker.ValidUserName(CNameNode)) {
    Valid = false;
  }

  //Password
  if (!checker.ValidPass(PassNode)) {
    Valid = false;
  }

  return Valid;
}
