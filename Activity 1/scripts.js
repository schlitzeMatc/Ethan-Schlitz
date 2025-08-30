console.log("Hello, World?");
document.getElementById("output").textContent = "Hello, World!";
let studentName = "Ethan";
const age = 20;
let isStudent = true;
let emptyValue = null;
let notAssigned;

console.log("Student Name:", studentName);
console.log("Age: ", age);
console.log("Is Student: ", isStudent);
console.log("Empty Value: ", emptyValue);
console.log("Not Assigned: ", notAssigned);

console.log("typeof studentName:", typeof studentName);
console.log("typeof age:", typeof age);
console.log("typeof isStudent", typeof isStudent);
console.log("typeof emptyValue:", typeof emptyValue);
console.log("typeof notAssigned:", typeof notAssigned);

console.log("Student Name: ", studentName);
studentName = "Zach";
console.log("New Student Name :", studentName);
try
{
    age = 21;
} catch (error)
{
    console.log("Cannot change const 'age'", error.message);

}