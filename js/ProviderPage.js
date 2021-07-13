import * as checker from "./util.js";
import Preventer from "./main.js";
import Provider, { parsProvider } from "./classes/Provider.js";

//if the provider not in the session
if (sessionStorage.key(0) !== "provider") {
  location.replace("./index.html");
}

//Json Obj
let Jsondata = sessionStorage.getItem("provider");

//from Json to provider Obj
let provider = parsProvider(JSON.parse(Jsondata));

//buttons
const Btn_Update = document.getElementById("btn-update");
const Btn_Logout = document.getElementById("btn-logout");

const Form = document.getElementById("Provider-INFO");
const alert = document.getElementById("alert-msg");

const CNameNode = document.getElementById("CName");
CNameNode.value = provider.getCompanyName();
CNameNode.setAttribute("disabled", true);

const CRecordNode = document.getElementById("CRecord");
CRecordNode.value = provider.getCRecord();

const PhoneNode = document.getElementById("Phone");
PhoneNode.value = provider.getPhone();

const EmailNode = document.getElementById("email");
EmailNode.value = provider.getEmail();

const PassNode = document.getElementById("pass");
PassNode.value = provider.getPassword();

const ConfPassNode = document.getElementById("Confpass");
ConfPassNode.value = provider.getPassword();

//logout action
Btn_Logout.addEventListener("click", (e) => {
  sessionStorage.removeItem("provider");
  location.replace("./index.html");
});

Btn_Update.addEventListener("click", UpdateProvider);

function UpdateProvider(e) {
  if (checkInput()) {
    //Values of all Nodes
    let CName = CNameNode.value.trim();
    let CRecord = CRecordNode.value.trim();
    let Phone = PhoneNode.value.trim();
    let email = EmailNode.value.trim();
    let pass = PassNode.value.trim();

    let newEmail = provider.getEmail() === email ? "" : email;

    provider = new Provider(CName, CRecord, Phone, provider.getEmail(), pass);

    Send_Provider(provider, newEmail);
  }
}

//Send POST to php via AJAX
function Send_Provider(provider, newEmail) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/ProviderHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let newProvider = PhpResponse(xhr.responseText);

      if (newProvider !== "") {
        //holdeing provider JSON Object
        sessionStorage.setItem("provider", newProvider);

        alert.className = "alert-success";
        document.getElementById("msg").innerText = "Updated successfully";
      }
    }
  };

  //set the parameters to send it as JSON
  var prams = `Provider-Update=&newEmail=${newEmail}&provider=${JSON.stringify(
    provider
  )}`;

  xhr.send(prams);
}

//to process the php response
function PhpResponse(response) {
  let JsonData = JSON.parse(response);
  let error = false;

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
  let pass = PassNode.value.trim();
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
