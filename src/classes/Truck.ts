// Importing the necessary classes and interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Define the Truck class that extends Vehicle and implements AbleToTow
class Truck extends Vehicle implements AbleToTow {
  // Declare properties of the Truck class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // Create a constructor that accepts the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number,
    wheels: Wheel[]
  ) {
    super(vin, color, make, model, year, weight, topSpeed, wheels); // Call the parent class constructor

    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Check if the wheels array has 4 elements, if not create 4 new default Wheel objects
    if (wheels.length !== 4) {
      this.wheels = Array.from({ length: 4 }, () => new Wheel(15, 'defaultBrand')); // You can adjust the default values as needed
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const vehicleWeight = vehicle.weight; // Assuming the Vehicle class has a weight property
    const vehicleMakeAndModel = `${vehicle.make} ${vehicle.model}`;

    if (vehicleWeight <= this.towingCapacity) {
      console.log(`The ${vehicleMakeAndModel} is being towed by the truck ${this.make} ${this.model}.`);
    } else {
      console.log(`The ${vehicleMakeAndModel} is too heavy to be towed by the truck ${this.make} ${this.model}.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails(); // Call the parent class printDetails method
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log(`Wheels: ${this.wheels.length} x ${this.wheels[0].diameter} inches (${this.wheels[0].brand})`); // Assuming Wheel has diameter and brand properties
  }
}

// Export the Truck class as the default export
export default Truck;
