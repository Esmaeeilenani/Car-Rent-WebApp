import * as checker from "./util.js";
import Provider, { parsProvider } from "./classes/Provider.js";
import Car, { parsCar } from "./classes/Car.js";

//if the provider not in the session
if (sessionStorage.key(0) !== "provider") {
  location.replace("./index.html");
}

//Json Obj
let Jsondata = sessionStorage.getItem("provider");

//from Json to provider Obj
let provider = parsProvider(JSON.parse(Jsondata));

//dispaly all Provider Cars
const CarsList = document.getElementById("cars-list");

//to display the form
const Btn_AddCar = document.getElementById("btn-AddCar");

//car form container
const Overlay = document.getElementById("overlay");
const CarForm_Cont = document.getElementById("car-container");
const Btn_Close = document.getElementById("closeForm");
const CardHeader = document.getElementById("card-header");

const CarFrom = document.getElementById("Car-INFO");

//input
const CarIDNode = document.getElementById("CarID");
const CarModelNode = document.getElementById("CarModel");
const ModelYearNode = document.getElementById("Model_Year");
const CarTypeNode = document.getElementById("CarType");
const PriceNode = document.getElementById("Price");

const StatusNode = document.getElementById("Status");
StatusNode.setAttribute("disabled", true);
StatusNode.classList.add("disabled");

const RenterNameNode = document.getElementById("RenterName");
RenterNameNode.setAttribute("disabled", true);
RenterNameNode.classList.add("disabled");

//Car from buttons
const Btn_Add = document.getElementById("btn-add");
const Btn_Update = document.getElementById("btn-update");

//Load all the provider Cars
CarLoader();

Btn_Add.addEventListener("click", AddCar);

//display Add car form
Btn_AddCar.addEventListener("click", DisplayAddCarForm);

//close car form
Btn_Close.addEventListener("click", CloseCarForm);

//delete car button action
CarsList.addEventListener("click", CarListOnClick);

function AddCar(e) {
  if (checkInput()) {
    let CarID = CarIDNode.value;
    let CarModel = CarModelNode.value;
    let ModelYear = ModelYearNode.value;
    let CarType = CarTypeNode.value;
    let Price = PriceNode.value;

    let car = new Car(CarID, CarModel, ModelYear, CarType, Price, true, "");

    Send_AddCar(car);
  }
}

//Send POST to php via AJAX to add Car
function Send_AddCar(car) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/CarHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      if (xhr.responseText !== "exists") {
        //add Car to car table and to provider List
        AddCartoTable(car, -1);
        provider.addCar(car);

        sessionStorage.setItem("provider", JSON.stringify(provider));
        CloseCarForm();
      } else {
        checker.setErrorFor(CarIDNode, "Car ID is exists");
      }
    }
  };

  //set the parameters to send it as JSON

  var prams = `AddCar=&car=${JSON.stringify(car)}`;

  xhr.send(prams);
}

//Load all the cars in the car List
function CarLoader() {
  let count = 0;
  provider.getCarsList().forEach((car) => {
    AddCartoTable(car, count);
    count++;
  });
}

function AddCartoTable(car, count) {
  car = parsCar(car);
  let tr = document.createElement("tr");

  //holde the Car index
  let td = document.createElement("td");

  //if counter -1 the car is new add
  td.innerHTML = count > -1 ? count : provider.CarsList.length;
  td.className = "hide";
  tr.appendChild(td);

  let Available = car.Status ? "Available" : "notAvailable";

  let RenterName = car.getCarRenter() == null ? "-" : car.getCarRenter();

  //Delete Button
  let Btn_td = document.createElement("td");
  let BntDel = document.createElement("button");
  BntDel.innerHTML = "&times";
  BntDel.classList.add("btn-del");

  if (!car.Status) {
    BntDel.classList.add("disabled");
    BntDel.setAttribute("disabled", true);
  }
  Btn_td.appendChild(BntDel);
  //---------------------------------------

  let CarINFO =
    `<td>${car.getCarID()}</td>` +
    `<td>${car.getCarModel()}</td>` +
    `<td>${car.getModel_Year()}</td>` +
    `<td>${car.getCarType()}</td>` +
    `<td>${car.getPrice()} SR</td>` +
    `<td>${Available}</td>` +
    `<td>${RenterName}</td>`;

  //add to tr
  tr.innerHTML += CarINFO;
  tr.appendChild(Btn_td);

  CarsList.appendChild(tr);
}

function DisplayAddCarForm(e) {
  Overlay.classList.remove("hide");
  CarForm_Cont.classList.remove("hide");
  CardHeader.innerText = "Add Car";

  //disabled Update btn "only add Allowed"
  Btn_Update.setAttribute("disabled", true);
  Btn_Update.classList.add("disabled");
}

function DisplayUpdateCarForm(e, index) {
  Overlay.classList.remove("hide");
  CarForm_Cont.classList.remove("hide");
  CardHeader.innerText = "Update Car";

  //disabled Add btn "only Update Allowed"
  Btn_Add.setAttribute("disabled", true);
  Btn_Add.classList.add("disabled");

  let car = provider.getCar(index);

  //set update car form input values
  CarIDNode.setAttribute("disabled", true);
  CarIDNode.value = car.CarID;
  CarModelNode.value = car.CarModel;
  ModelYearNode.value = car.Model_Year;
  CarTypeNode.value = car.CarType;
  PriceNode.value = car.Price;

  StatusNode.value = car.Status ? "Available" : "notAvailable";
  StatusNode.classList.remove("disabled");

  RenterNameNode.value = car.CarRenter == null ? "-" : car.CarRenter;
  RenterNameNode.classList.remove("disabled");

  Btn_Update.addEventListener("click", (e) => {
    car.CarID = CarIDNode.value;
    car.CarModel = CarModelNode.value;
    car.Model_Year = ModelYearNode.value;
    car.CarType = CarTypeNode.value;
    car.Price = PriceNode.value;

    Send_UpdateCar(car, index);
  });
}

//Send POST to php via AJAX to Update Car
function Send_UpdateCar(car, index) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/CarHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
      provider.getCarsList[index] = car;

      sessionStorage.setItem("provider", JSON.stringify(provider));
      CloseCarForm();
    }
  };

  //set the parameters to send it as JSON

  var prams = `UpdateCar=&index=${index}&car=${JSON.stringify(car)}`;

  xhr.send(prams);
}

function CloseCarForm() {
  //hide the form and overlay
  Overlay.classList.add("hide");
  CarForm_Cont.classList.add("hide");

  //enabled all btn
  Btn_Update.classList.remove("disabled");
  Btn_Update.removeAttribute("disabled");

  Btn_Add.classList.remove("disabled");
  Btn_Add.removeAttribute("disabled");

  CarIDNode.removeAttribute("disabled");

  //reset text
  CarFrom.reset();

  //remove success,error css classes
  resetFormInput(CarIDNode);
  resetFormInput(CarModelNode);
  resetFormInput(ModelYearNode);
  resetFormInput(CarTypeNode);
  resetFormInput(PriceNode);
  resetFormInput(StatusNode);
  resetFormInput(RenterNameNode);
}

function resetFormInput(input) {
  const parent = input.parentElement;
  parent.classList.remove("success");
  parent.classList.remove("error");
}

function checkInput() {
  let Vlaid = true;

  if (!checker.ValidCarID(CarIDNode)) {
    Vlaid = false;
  }

  if (!checker.ValidCarModel(CarModelNode)) {
    Vlaid = false;
  }

  if (ModelYearNode.value === "") {
    checker.setErrorFor(ModelYearNode, "Model Year connot be empty");
    Vlaid = false;
  } else {
    checker.setSuccessFor(ModelYearNode);
  }

  if (!checker.ValidCarType(CarTypeNode)) {
    Vlaid = false;
  }

  if (!checker.ValidPrice(PriceNode)) {
    Vlaid = false;
  }

  return Vlaid;
}

//to delete a car or open update form
function CarListOnClick(e) {
  /*
  target -> button
  parent of button -> td
  parent of td -> tr
  delete tr
*/
  if (e.target.tagName === "BUTTON") {
    let tr = e.target.parentElement.parentElement;
    let index = Number(tr.firstChild.innerText);

    provider.getCarsList().splice(index, index + 1);
    CarsList.removeChild(tr);

    //update the data in session
    sessionStorage.setItem("provider", JSON.stringify(provider));
  } else if (e.target.tagName === "TD") {
    let tr = e.target.parentElement;
    var index = tr.firstChild.innerText;

    DisplayUpdateCarForm(e, index);
  }
}
