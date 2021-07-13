import { DrivingAge } from "./classes/Renter.js";

export function ValidUserName(UserNameNode) {
  let UserName = UserNameNode.value.trim();
  if (UserName === "") {
    setErrorFor(UserNameNode, "Username connot be empty");
    return false;
  } else if (!isUserName(UserName)) {
    setErrorFor(UserNameNode, "Wrong Username Fromat");
    return false;
  } else if (String(UserName).length < 3) {
    setErrorFor(UserNameNode, "Short Username most be 3 or more character");

    return false;
  } else if (String(UserName).length > 20) {
    setErrorFor(UserNameNode, "Long Username most be 20 or less character");
    return false;
  }
  setSuccessFor(UserNameNode);

  return true;
}

export function ValidName(NameNode) {
  let Name = NameNode.value.trim();

  if (Name === "") {
    setErrorFor(NameNode, "Name connot be empty");
    return false;
  } else if (!isName(Name)) {
    setErrorFor(NameNode, "Wrong Name Fromat");
    return false;
  }
  setSuccessFor(NameNode);

  return true;
}

export function ValidAge(AgeNode) {
  let Age = AgeNode.value.trim();

  //Age
  if (Age === "") {
    setErrorFor(AgeNode, "Age connot be empty");
    return false;
  } else if (isNaN(Age)) {
    setErrorFor(AgeNode, "Please Enter Number Only");
    return false;
  } else if (Age < DrivingAge()) {
    setErrorFor(AgeNode, "You Should be older than 20");
    return false;
  }
  setSuccessFor(AgeNode);
  return true;
}

export function ValidPhone(PhoneNode) {
  let Phone = PhoneNode.value;

  let re = /^[0]{0,1}[5]{1,2}[0-9]{8}$/;

  if (!re.test(Phone)) {
    setErrorFor(PhoneNode, "Wrong Phone number");
    return false;
  }

  setSuccessFor(PhoneNode);
  return true;
}

export function ValidEmail(EmailNode) {
  let email = EmailNode.value.trim();
  //Email
  if (email === "") {
    setErrorFor(EmailNode, "Email connot be empty");
    return false;
  } else if (!isEmail(email)) {
    setErrorFor(EmailNode, "Wrong Email format");
    return false;
  }
  setSuccessFor(EmailNode);
  return true;
}

export function ValidNaId(NAidNode) {
  let NAid = NAidNode.value.trim();

  //National ID
  if (NAid === "") {
    setErrorFor(NAidNode, "National ID connot be empty");
    return false;
  } else if (isNaN(NAid)) {
    setErrorFor(NAidNode, "National ID Must be digits only");
    return false;
  } else if (String(NAid).length !== 10) {
    setErrorFor(NAidNode, "National ID Must be 10 digits");
    return false;
  }

  setSuccessFor(NAidNode);
  return true;
}

export function ValidCrecord(CRecordNode) {
  let CRecord = CRecordNode.value.trim();

  //Commercial record
  if (CRecord === "") {
    setErrorFor(CRecordNode, "Commercial record connot be empty");
    return false;
  } else if (isNaN(CRecord)) {
    setErrorFor(CRecordNode, "Commercial record Must be digits only");
    return false;
  } else if (String(CRecord).length !== 10) {
    setErrorFor(CRecordNode, "Commercial record Must be 10 digits");
    return false;
  }

  setSuccessFor(CRecordNode);
  return true;
}

export function ValidPass(PassNode) {
  let pass = PassNode.value.trim();
  //Password
  if (pass === "") {
    setErrorFor(PassNode, "Password connot be empty");

    return false;
  }
  setSuccessFor(PassNode);
  return true;
}

export function ValidConfPass(pass, ConfPassNode) {
  //Confirm Password
  let Confpass = ConfPassNode.value.trim();
  if (Confpass === "") {
    setErrorFor(ConfPassNode, "Confirm Password connot be empty");
    return false;
  } else if (Confpass !== pass) {
    setErrorFor(ConfPassNode, "Passwords are not equals");
    return false;
  }
  setSuccessFor(ConfPassNode);

  return true;
}

export function ValidCarID(CarIDNode) {
  let re = /^[a-zA-Z0-9]{17}$/;
  let CarID = CarIDNode.value;

  if (CarID === "") {
    setErrorFor(CarIDNode, "Car ID connot be empty");
    return false;
  } else if (String(CarID).length !== 17) {
    setErrorFor(CarIDNode, "Car ID should be 17 characters long");
    return false;
  } else if (!re.test(CarID)) {
    setErrorFor(CarIDNode, "Wrong Car ID format");
    return false;
  }
  setSuccessFor(CarIDNode);
  return true;
}

export function ValidCarModel(CarModelNode) {
  let CarModel = CarModelNode.value;

  if (CarModel === "") {
    setErrorFor(CarModelNode, "Car Model connot be empty");
    return false;
  } else if (!isName(CarModel)) {
    setErrorFor(CarModelNode, "Car Model Must be letters only");
    return false;
  }
  setSuccessFor(CarModelNode);
  return true;
}

export function ValidCarType(CarTypeNode) {
  let CarType = CarTypeNode.value;

  if (CarType === "") {
    setErrorFor(CarTypeNode, "Car Type connot be empty");
    return false;
  } else if (!isName(CarType)) {
    setErrorFor(CarTypeNode, "Car Type Must be letters only");
    return false;
  }
  setSuccessFor(CarTypeNode);
  return true;
}

export function ValidPrice(PriceNode) {
  let Price = PriceNode.value;

  if (Price === "") {
    setErrorFor(PriceNode, "Price connot be empty");
    return false;
  } else if (isNaN(Price)) {
    setErrorFor(PriceNode, "Price Must be digits only");
    return false;
  }
  setSuccessFor(PriceNode);
  return true;
}

export function setErrorFor(input, message) {
  const parent = input.parentElement;
  const span = parent.querySelector("span");
  span.innerHTML = message;
  //in cases there was an success before
  parent.classList.remove("success");
  parent.classList.add("error");
}

export function setSuccessFor(input) {
  const parent = input.parentElement;
  //in cases there was an error before
  parent.classList.remove("error");
  parent.classList.add("success");
}

export function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isUserName(UserName) {
  const re = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return re.test(String(UserName));
}

export function isName(Name) {
  const re = /^[a-zA-Z ]+$/;
  return re.test(String(Name));
}
