var renter = null;
const header = document.querySelector("header");
incHeader();

//ajax to incloud the header
function incHeader() {
  let xhr = new XMLHttpRequest();

  //open the File
  xhr.open("GET", "./header.html", true);

  xhr.addEventListener("load", Header);

  xhr.send();
}

function Header() {
  if (this.status == 200) {
    header.innerHTML = this.responseText;

    if (sessionStorage.key(0) === "renter") {
      RenterNav();
    } else if (sessionStorage.key(0) === "provider") {
      ProviderNav();
    } else {
      OriginalNav();
    }
  }
}

function RenterNav() {
  let ul = header.querySelector("ul");

  //change home link
  let a = ul.children.item(0).firstChild;
  a.setAttribute("href", "RenterPage.html");

  //add Renterd Cars li for renter
  let li = document.createElement("li");
  li.innerHTML = '<a href="RentedCars.html">Rented Cars</a>';

  //insert the li before about link
  ul.insertBefore(li, ul.children.item(2));
}

function ProviderNav() {
  let ul = header.querySelector("ul");

  //change home link
  let a = ul.children.item(0).firstChild;
  a.setAttribute("href", "ProviderPage.html");

  //add My Cars li for provider
  let li = document.createElement("li");
  li.innerHTML = '<a href="ProviderCars.html">My Cars</a>';

  //insert the li before about link
  ul.insertBefore(li, ul.children.item(2));
}

function OriginalNav() {
  let ul = header.querySelector("ul");

  // if (ul.childElementCount === 4) {
  //   ul.children.item(2).remove();
  // }
}

//Prevent Loged in renter or provider from access
export default function Preventer() {
  if (sessionStorage.key(0) === "renter") {
    location.replace("./RenterPage.html");
  } else if (sessionStorage.key(0) === "provider") {
    location.replace("./ProviderPage.html");
  }
}
