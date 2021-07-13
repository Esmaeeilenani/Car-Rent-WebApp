export default class Car {
  CarID;
  CarModel;
  Model_Year;
  CarType;
  Price;
  Status;
  CarProvider;
  CarRenter;

  constructor(
    CarID,
    CarModel,
    Model_Year,
    CarType,
    Price,
    Status,
    CarProvider
  ) {
    this.CarID = CarID;
    this.CarModel = CarModel;
    this.Model_Year = Model_Year;
    this.CarType = CarType;
    this.Price = Price;
    this.Status = Status;
    this.CarProvider = CarProvider;
    this.CarRentr = null;
  }

  setCarID(CarID) {
    this.CarID = CarID;
  }
  setCarModel(CarModel) {
    this.CarModel = CarModel;
  }
  setModel_Year(Model_Year) {
    this.Model_Year = Model_Year;
  }
  setCarType(CarType) {
    this.CarType = CarType;
  }
  setPrice(Price) {
    this.Price = Price;
  }
  setStatus(Status) {
    this.Status = Status;
  }
  setCarProvider(CarProvider) {
    this.CarProvider = CarProvider;
  }
  setCarRenter(CarRenter) {
    this.CarRenter = CarRenter;
  }

  getCarID() {
    return this.CarID;
  }
  getCarModel() {
    return this.CarModel;
  }
  getModel_Year() {
    return this.Model_Year;
  }
  getCarType() {
    return this.CarType;
  }
  getPrice() {
    return this.Price;
  }
  getStatus() {
    return this.Status;
  }
  getCarProvider() {
    return this.CarProvider;
  }
  getCarRenter() {
    return this.CarRenter;
  }
}

export function parsCar(car) {
  let newCar = new Car(
    car.CarID,
    car.CarModel,
    car.Model_Year,
    car.CarType,
    car.Price,
    car.Status,
    car.CarProvider
  );

  newCar.setCarRenter(car.CarRenter);

  return newCar;
}
