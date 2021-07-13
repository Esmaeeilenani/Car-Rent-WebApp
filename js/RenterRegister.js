import * as checker from "./util.js";
import Preventer from "./main.js";
import Renter, { parsRenter } from "./classes/Renter.js";

Preventer();

//renter Register Form
const Form = document.getElementById("Register");
const UserNameNode = document.getElementById("UserName");
const NameNode = document.getElementById("Name");
const AgeNode = document.getElementById("Age");
const PhoneNode = document.getElementById("Phone");
const EmailNode = document.getElementById("email");
const NAidNode = document.getElementById("NAid");
const PassNode = document.getElementById("pass");
const ConfPassNode = document.getElementById("Confpass");

//Values of all Nodes
let UserName = "";
let Name = "";
let Age = "";
let Phone = "";
let email = "";
let NAid = "";
let pass = "";
let Confpass = "";

Form.addEventListener("submit", RenterRegForm);

function RenterRegForm(e) {
  e.preventDefault();

  if (checkInput()) {
    //Values of all Nodes
    UserName = UserNameNode.value.trim();
    Name = NameNode.value.trim();
    Age = AgeNode.value.trim();
    Phone = PhoneNode.value.trim();
    email = EmailNode.value.trim();
    NAid = NAidNode.value.trim();
    pass = PassNode.value.trim();

    let renter = new Renter(UserName, Name, Age, Phone, email, NAid, pass);
    Send_Renter(renter);
  }
}

//Send POST to php via AJAX
function Send_Renter(renter) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/RenterHandler.inc.php", true);

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
  var prams = "RenterReg=&renter=" + JSON.stringify(renter);

  xhr.send(prams);
}

//to process the php response
function PhpResponse(response) {
  let JsonData = JSON.parse(response);
  let error = false;

  if (JsonData.UserName === "UserNameExsists") {
    checker.setErrorFor(UserNameNode, "UserName is Exsists");
    error = true;
  } else {
    checker.setSuccessFor(UserNameNode);
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

//return false if no errors
function checkInput() {
  pass = PassNode.value.trim();
  Confpass = ConfPassNode.value.trim();
  let Vlaid = true;

  if (!checker.ValidUserName(UserNameNode)) {
    Vlaid = false;
  }
  if (!checker.ValidName(NameNode)) {
    Vlaid = false;
  }
  if (!checker.ValidAge(AgeNode)) {
    Vlaid = false;
  }

  if (!checker.ValidPhone(PhoneNode)) {
    Vlaid = false;
  }

  if (!checker.ValidEmail(EmailNode)) {
    Vlaid = false;
  }
  if (!checker.ValidNaId(NAidNode)) {
    Vlaid = false;
  }
  if (!checker.ValidPass(PassNode)) {
    Vlaid = false;
  }
  if (!checker.ValidConfPass(pass, ConfPassNode)) {
    Vlaid = false;
  }

  return Vlaid;

  // return (
  //   checker.ValidUserName(UserNameNode) &&
  //   checker.ValidName(NameNode) &&
  //   checker.ValidAge(AgeNode) &&
  //   checker.ValidEmail(EmailNode) &&
  //   checker.ValidNaId(NAidNode) &&
  //   checker.ValidPass(PassNode) &&
  //   checker.ValidConfPass(pass, ConfPassNode)
  // );
}
