import * as checker from "./util.js";
import Preventer from "./main.js";
import Provider, { parsProvider } from "./classes/Provider.js";
Preventer();

//renter Register Form
const Form = document.getElementById("Register");
const CNameNode = document.getElementById("CName");
const CRecordNode = document.getElementById("CRecord");
const PhoneNode = document.getElementById("Phone");
const EmailNode = document.getElementById("email");
const PassNode = document.getElementById("pass");
const ConfPassNode = document.getElementById("Confpass");

//Values of all Nodes
let CName = "";
let CRecord = "";
let Phone = "";
let email = "";
let pass = "";
let Confpass = "";

Form.addEventListener("submit", ProviderRegForm);

function ProviderRegForm(e) {
  e.preventDefault();

  if (checkInput()) {
    //Values of all Nodes
    CName = CNameNode.value.trim();
    CRecord = CRecordNode.value.trim();
    Phone = PhoneNode.value.trim();
    email = EmailNode.value.trim();
    pass = PassNode.value.trim();

    let provider = new Provider(CName, CRecord, Phone, email, pass);
    Send_Provider(provider);
  }
}

//Send POST to php via AJAX
function Send_Provider(provider) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/ProviderHandler.inc.php", true);

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
  var prams = "ProviderReg=&provider=" + JSON.stringify(provider);

  xhr.send(prams);
}

//to process the php response
function PhpResponse(response) {
  let JsonData = JSON.parse(response);
  let error = false;

  if (JsonData.CompanyName === "CNameExsists") {
    checker.setErrorFor(CNameNode, "Company name is Exsists");
    error = true;
  } else {
    checker.setSuccessFor(CNameNode);
  }

  if (JsonData.CRecord === "CRecordExsists") {
    checker.setErrorFor(CRecordNode, "Commercial record is Exsists");
    error = true;
  } else {
    checker.setSuccessFor(CRecordNode);
  }

  if (JsonData.Email === "EmailExsists") {
    checker.setErrorFor(EmailNode, "Email is Exsists");
    error = true;
  } else {
    checker.setSuccessFor(EmailNode);
  }

  //return the respose so sessionStorege can work with it
  return !error ? response : "";
}

function checkInput() {
  pass = PassNode.value.trim();
  Confpass = ConfPassNode.value.trim();
  let Vlaid = true;

  if (!checker.ValidUserName(CNameNode)) {
    Vlaid = false;
  }

  if (!checker.ValidCrecord(CRecordNode)) {
    Vlaid = false;
  }

  if (!checker.ValidPhone(PhoneNode)) {
    Vlaid = false;
  }

  if (!checker.ValidEmail(EmailNode)) {
    Vlaid = false;
  }

  if (!checker.ValidPass(PassNode)) {
    Vlaid = false;
  }
  if (!checker.ValidConfPass(pass, ConfPassNode)) {
    Vlaid = false;
  }

  return Vlaid;
}
