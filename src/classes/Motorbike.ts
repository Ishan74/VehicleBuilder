// Importing the necessary classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Define the Motorbike class that extends Vehicle
class Motorbike extends Vehicle {
  // Declare properties of the Motorbike class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Create a constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
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

    // Check if the wheels array has 2 elements, if not create 2 new default Wheel objects
    if (wheels.length !== 2) {
      this.wheels = Array.from({ length: 2 }, () => new Wheel(15, 'defaultBrand')); // You can adjust the default values as needed
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the wheelie method
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails(); // Call the parent class printDetails method
    console.log(`Wheels: ${this.wheels.length} x ${this.wheels[0].diameter} inches (${this.wheels[0].brand})`); // Assuming Wheel has diameter and brand properties
  }
}

// Export the Motorbike class as the default export
export default Motorbike;
