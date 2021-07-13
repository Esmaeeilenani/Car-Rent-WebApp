export default class Provider {
  CompanyName;
  CRecord;
  Phone;
  Email;
  Password;
  CarsList = [];

  constructor(CompanyName, CRecord, Phone, Email, Password) {
    this.CompanyName = CompanyName;
    this.CRecord = CRecord;
    this.Phone = Phone;
    this.Email = Email;
    this.Password = Password;
  }
  setCompanyName(CompanyName) {
    this.CompanyName = CompanyName;
  }
  setCRecord(CRecord) {
    this.CRecord = CRecord;
  }
  setPhone(Phone) {
    this.Phone = Phone;
  }
  setEmail(Email) {
    this.Email = Email;
  }
  setPassword(Password) {
    this.Password = Password;
  }

  getCompanyName() {
    return this.CompanyName;
  }
  getCRecord() {
    return this.CRecord;
  }
  getPhone() {
    return this.Phone;
  }
  getEmail() {
    return this.Email;
  }
  getPassword() {
    return this.Password;
  }

  addCar(Car) {
    this.CarsList.push(Car);
  }

  getCar(index) {
    return this.CarsList[index];
  }
  setCarsList(CarsList) {
    this.CarsList = CarsList;
  }
  getCarsList() {
    return this.CarsList;
  }
}

export function parsProvider(provider) {
  let newProvider = new Provider(
    provider.CompanyName,
    provider.CRecord,
    provider.Phone,
    provider.Email,
    provider.Password
  );
  newProvider.setCarsList(provider.CarsList);
  return newProvider;
}
