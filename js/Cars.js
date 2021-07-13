import * as checker from "./util.js";
import Provider, { parsProvider } from "./classes/Provider.js";
import Car, { parsCar } from "./classes/Car.js";
import Renter, { parsRenter } from "./classes/Renter.js";

//will be based on the Car Provider
var CarArr = Array();

//dispaly all Provider Cars
const CarsList = document.getElementById("cars-list");

const ProviderSelction = document.getElementById("providers");

//Load Providers names to selection box
getProvidersName();

const BtnFine = document.getElementById("find");

const Overlay = document.getElementById("overlay");

BtnFine.addEventListener("click", diplayCars);

//when user click to rent a car
CarsList.addEventListener("click", RentBtnClicked);

//to rent a car
function RentBtnClicked(e) {
  //the Button is clicked
  if (e.target.tagName === "BUTTON") {
    //no renting will be done if there is no renter
    if (sessionStorage.getItem("renter") == null) {
      Overlay.classList.remove("hide");

      //delay the alert
      setTimeout(() => {
        alert("Please Login as Renter to Rent the car");
        Overlay.classList.add("hide");
      }, 100);

      return;
    }

    //get the Row and the first chaild of the row to get the index
    let tr = e.target.parentElement.parentElement;
    let CarIndex = Number(tr.firstChild.innerText);
    RentCar(e, CarIndex);
  }
}

function RentCar(e, CarIndex) {
  let JsonData = sessionStorage.getItem("renter");
  let renter = parsRenter(JSON.parse(JsonData));

  let car = parsCar(CarArr[CarIndex]);

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/RentHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      Overlay.classList.remove("hide");
      renter.addCar(car);
      sessionStorage.setItem("renter", JSON.stringify(renter));

      //delay the alert
      setTimeout(() => {
        alert("Successfully Rented");
        Overlay.classList.add("hide");
      }, 100);

      e.target.classList.add("disabled");
      e.target.setAttribute("disabled", true);
    }
  };

  let JsonCar = JSON.stringify(car);

  var prams = `car=${JsonCar}`;
  xhr.send(prams);
}

//display the cars of chosen Provider
function diplayCars() {
  //reset all Element of the table
  CarsList.innerHTML = "";

  let index = ProviderSelction.selectedIndex;

  if (index > 0) {
    let ProviderName = ProviderSelction.options[index].value;
    getProviderCar(ProviderName);
  }
}

//get the provider cars from DB
function getProviderCar(name) {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/CarHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let provider = parsProvider(JSON.parse(xhr.responseText));

      let count = 0;
      provider.getCarsList().forEach((car) => {
        AddCartoTable(car, count);
        count++;
      });

      CarArr = provider.getCarsList();
    }
  };

  var prams = `ProviderName=${name}`;
  xhr.send(prams);
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

  //Rent Button
  let Btn_td = document.createElement("td");
  let BntRent = document.createElement("button");

  BntRent.innerHTML = "Rent";
  BntRent.classList.add("btn-primary");
  BntRent.setAttribute("id", "btn-rent");

  if (!car.getStatus()) {
    BntRent.classList.add("disabled");
    BntRent.setAttribute("disabled", true);
  }
  Btn_td.appendChild(BntRent);
  //---------------------------------------

  let CarINFO =
    `<td>${car.getCarModel()}</td>` +
    `<td>${car.getModel_Year()}</td>` +
    `<td>${car.getCarType()}</td>` +
    `<td>${car.getPrice()} SR</td>` +
    `<td>${Available}</td>`;

  //add to tr
  tr.innerHTML += CarINFO;
  tr.appendChild(Btn_td);

  CarsList.appendChild(tr);
}

//get All Providers names
function getProvidersName() {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "php/incloud/ProviderHandler.inc.php", true);

  //to Work with POST
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = () => {
    if (xhr.status == 200) {
      let providers = JSON.parse(xhr.responseText);

      for (const index in providers) {
        let name = providers[index].CName;
        let opt = document.createElement("option");
        opt.setAttribute("value", name);
        opt.innerText = String(name).toUpperCase();
        ProviderSelction.appendChild(opt);
      }
    }
  };

  var prams = `ProvidersName=`;
  xhr.send(prams);
}
