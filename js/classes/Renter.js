export default class Renter {
  UserName;
  Name;
  Age;
  Phone;
  Email;
  NaID;
  Password;
  CarsList = [];
  static DrivingAge = 21;

  constructor(UserName, Name, Age, Phone, Email, NaID, Password) {
    this.UserName = UserName;
    this.Name = Name;
    this.Age = Age;
    this.Phone = Phone;
    this.Email = Email;
    this.NaID = NaID;
    this.Password = Password;
  }

  setUserName(UserName) {
    this.UserName = UserName;
  }

  getUserName() {
    return this.UserName;
  }

  setName(Name) {
    this.Name = Name;
  }

  getName() {
    return this.Name;
  }
  setAge(Age) {
    this.Age = Age;
  }
  getAge() {
    return this.Age;
  }
  setPhone(phone) {
    this.Phone = phone;
  }
  getPhone() {
    return this.Phone;
  }

  setEmail(Email) {
    this.Email = Email;
  }
  getEmail() {
    return this.Email;
  }
  setNaID(NaID) {
    this.NaID = NaID;
  }
  getNaID() {
    return this.NaID;
  }
  setPassword(Password) {
    this.Password = Password;
  }
  getPassword() {
    return this.Password;
  }

  addCar(Car) {
    this.CarsList.push(Car);
  }

  setCarsList(CarsList) {
    this.CarsList = CarsList;
  }

  getCar(index) {
    this.CarsList[index];
  }
  getCarsList() {
    return this.CarsList;
  }
}

//pars object to Renter
export function parsRenter(renter) {
  let newRenter = new Renter(
    renter.UserName,
    renter.Name,
    renter.Age,
    renter.Phone,
    renter.Email,
    renter.NaID,
    renter.Password
  );
  newRenter.setCarsList(renter.CarsList);

  return newRenter;
}

export function DrivingAge() {
  return Renter.DrivingAge;
}
