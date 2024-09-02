import Server from "./config/server";

// import Employee from "./models/Employee";
// import Category from "./models/Category";
// import { Role } from "./models/Role";
const server = new Server();
server.listen();

const categories = [
  {
    name: "Electronics",
    description: "Devices and gadgets such as computers, phones, and TVs.",
  },
  {
    name: "Furniture",
    description:
      "Office and home furniture including chairs, desks, and tables.",
  },
  {
    name: "Office Supplies",
    description: "Items such as pens, paper, and other office essentials.",
  },
  {
    name: "Vehicles",
    description: "Company vehicles including cars, trucks, and vans.",
  },
];

// Crear empleados
const employees = [
  { name: "John Doe", email: "john.doe@example.com", position: "Developer" },
  { name: "Jane Smith", email: "jane.smith@example.com", position: "Designer" },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    position: "Manager",
  },
  { name: "Bob Brown", email: "bob.brown@example.com", position: "HR" },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    position: "Sales",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    position: "Support",
  },
  { name: "Eva White", email: "eva.white@example.com", position: "Finance" },
  {
    name: "Frank Harris",
    email: "frank.harris@example.com",
    position: "Logistics",
  },
  { name: "Grace Lee", email: "grace.lee@example.com", position: "Marketing" },
  { name: "Henry Clark", email: "henry.clark@example.com", position: "IT" },
];

const roles = [
  { name: "admin", description: "Administrator with full access rights." },
  { name: "user", description: "Regular user with limited access rights." },
];

// const agregar = async () => {
//   try {
//     // await Category.insertMany(categories);
//     // await Employee.insertMany(employees);
//     await Role.insertMany(roles);
//   } catch (error) {
//     // Handle the error here
//     console.error(error);
//   }
// };

// agregar();

// try {
//   Category.insertMany(categories);
//   Employee.insertMany(employees);
// } catch (error) {
//   // Handle the error here
//   console.error(error);
// }
