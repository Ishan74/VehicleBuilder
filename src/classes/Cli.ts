// Importing necessary classes
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[]; // Update to include Truck and Motorbike
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([{
        type: 'list',
        name: 'selectedVehicleVin',
        message: 'Select a vehicle to perform an action on',
        choices: this.vehicles.map((vehicle) => ({
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle.vin,
        })),
      }])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([{
        type: 'list',
        name: 'vehicleType',
        message: 'Select a vehicle type',
        choices: ['Car', 'Truck', 'Motorbike'],
      }])
      .then((answers) => {
        switch (answers.vehicleType) {
          case 'Car':
            this.createCar();
            break;
          case 'Truck':
            this.createTruck();
            break;
          case 'Motorbike':
            this.createMotorbike();
            break;
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([ /* Car prompts here... */ ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([ /* Truck prompts here... */ ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity),
          []
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([ /* Motorbike prompts here... */ ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(answers.frontWheelDiameter, answers.frontWheelBrand),
            new Wheel(answers.rearWheelDiameter, answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    // Implement method logic here
  }

  performActions(): void {
    inquirer
      .prompt([{
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: [
          'Print details',
          'Start vehicle',
          'Accelerate 5 MPH',
          'Decelerate 5 MPH',
          'Stop vehicle',
          'Turn right',
          'Turn left',
          'Reverse',
          'Select or create another vehicle',
          'Exit',
        ],
      }])
      .then((answers) => {
        // Add action handling logic here
        // Check for truck and motorbike specific actions as needed
      });
  }

  startCli(): void {
    inquirer
      .prompt([{
        type: 'list',
        name: 'CreateOrSelect',
        message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
        choices: ['Create a new vehicle', 'Select an existing vehicle'],
      }])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// Export the Cli class
export default Cli;
