import * as checker from "./util.js";
import Renter, { parsRenter } from "./classes/Renter.js";

//if the renter not in the session
if (sessionStorage.key(0) !== "renter") {
  location.replace("./index.html");
}

//Json Obj
let Jsondata = sessionStorage.getItem("renter");

//from Json to renter Obj
let renter = parsRenter(JSON.parse(Jsondata));

//buttons
const Btn_Update = document.getElementById("btn-update");
const Btn_Logout = document.getElementById("btn-logout");

const Form = document.getElementById("RenterINFO");
const alert = document.getElementById("alert-msg");

const UserNameNode = document.getElementById("UserName");
UserNameNode.value = renter.getUserName();
UserNameNode.setAttribute("disabled", true);

const NameNode = document.getElementById("Name");
NameNode.value = renter.getName();

const AgeNode = document.getElementById("Age");
AgeNode.value = renter.getAge();

const PhoneNode = document.getElementById("Phone");
PhoneNode.value = renter.getPhone();

const EmailNode = document.getElementById("email");
EmailNode.value = renter.getEmail();

const NAidNode = document.getElementById("NAid");
NAidNode.value = renter.getNaID();

const PassNode = document.getElementById("pass");
PassNode.value = renter.getPassword();

const ConfPassNode = document.getElementById("Confpass");
ConfPassNode.value = renter.getPassword();

//logout action
Btn_Logout.addEventListener("click", (e) => {
  sessionStorage.removeItem("renter");
  location.replace("./index.html");
});

Btn_Update.addEventListener("click", UpdateRenter);

function UpdateRenter(e) {
  //all input is OK
  if (checkInput()) {
    //Values of all Nodes
    let UserName = UserNameNode.value.trim();
    let Name = NameNode.value.trim();
    let Age = AgeNode.value.trim();
    let Phone = PhoneNode.value.trim();
    let email = EmailNode.value.trim();
    let NAid = NAidNode.value.trim();
    let pass = PassNode.value.trim();

    let newEmail =
      renter.getEmail().toLowerCase() === email.toLowerCase() ? "" : email;

    renter = new Renter(
      UserName,
      Name,
      Age,
      Phone,
      renter.getEmail(),
      NAid,
      pass
    );

    Send_Renter(renter, newEmail);
  }
}

//Send POST to php via AJAX
function Send_Renter(renter, newEmail) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/RenterHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let newRenter = PhpResponse(xhr.responseText);

      if (newRenter !== "") {
        //holdeing renter JSON Object
        sessionStorage.setItem("renter", newRenter);

        alert.className = "alert-success";
        document.getElementById("msg").innerText = "Updated successfully";
      }
    }
  };

  //set the parameters to send it as JSON
  var prams =
    "Renter-Update=&newEmail=" + newEmail + "&renter=" + JSON.stringify(renter);

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

//return false if no errors
function checkInput() {
  let pass = PassNode.value.trim();
  let Confpass = ConfPassNode.value.trim();
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
}
