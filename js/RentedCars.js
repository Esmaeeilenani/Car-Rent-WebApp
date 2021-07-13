import Renter, { parsRenter } from "./classes/Renter.js";
import Car, { parsCar } from "./classes/Car.js";

//Json Obj
let Jsondata = sessionStorage.getItem("renter");

//from Json to renter Obj
let renter = parsRenter(JSON.parse(Jsondata));

//dispaly all Provider Cars
const CarsList = document.getElementById("cars-list");

CarLoader();
console.log(renter);
//Load all the cars in the car List
function CarLoader() {
  let count = 0;
  renter.getCarsList().forEach((car) => {
    AddCartoTable(car, count);
    count++;
  });
}

function AddCartoTable(car, count) {
  car = parsCar(car);
  let tr = document.createElement("tr");

  //holde the Car index
  let td = document.createElement("td");

  td.innerHTML = count;
  td.className = "hide";
  tr.appendChild(td);

  let CarINFO =
    `<td>${car.getCarModel()}</td>` +
    `<td>${car.getModel_Year()}</td>` +
    `<td>${car.getCarType()}</td>` +
    `<td>${car.getPrice()} SR</td>` +
    `<td>${car.getCarProvider()}</td>`;

  //add to tr
  tr.innerHTML += CarINFO;

  CarsList.appendChild(tr);
}
