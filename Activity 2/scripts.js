let x = 10;
let y = 20;
//Arithmetic Operators
console.log("Arithmetic Operators:");
console.log("Addition (x+y):", x + y);
console.log("Subtraction (x-y):", x - y);
console.log("Multiplication (x*y):", x * y);
console.log("Division (x/y):", x / y);
console.log("Modulus (x%y):", x % y);
//Operator Precedence
console.log("x + y * 10", x + y * 10);
console.log("(x + y) * 10", (x + y) * 10);
//Comparison Operators
console.log("x == 10", x == 10);
console.log("x === 10", x === 10);
console.log("x != y", x != y);
console.log("x !== 10", x !== 10);
console.log("x > y", x > y);
console.log("x < y", x < y);
console.log("x >= y", x >= y);
console.log("x <= y", x <=y);

//Logical Operators
console.log("true && true", true && true);
console.log("true && false", true && false);
console.log("false && false", false && false);
console.log("false && true", false && true);
console.log("true || false", true || false);
console.log("true || true", true || true);
console.log("false || false", false || false);
console.log("!true", !true);
console.log("!false", !false);
//Conditional Statements
let age = 17;
if(age > 18)
{
    console.log("You are older than 18");
}
else if(age == 18)
{
    console.log("You are excactly 18");
}
else
{
    console.log("You are under 18");
} 
//Switch Statement
let day = "Friday";
switch(day)
{
    case "Monday":
        console.log("Today is Monday");
        break;
    case "Tuesday":
        console.log("Today is Tuesday");
        break;
    case "Wednesday":
        console.log("Today is Wednesday");
        break;
    case "Thursday":
        console.log("Today is Thursday");
        break;
    case "Friday":
        console.log("Today is Friday");
        break;
    case "Saturday":
        console.log("Today is Saturday");
        break;
    case "Sunday":
        console.log("Today is Sunday");
        break;
    default:
        console.log("Enter a day of the week");

}
//Age Checker
function checkAge()
{
    const ageInput = document.getElementById("ageInput").value;
    const resultDiv = document.getElementById("result");
    
    let mesage = "";
    resultDiv.className = "";
    if(isNaN(ageInput) || ageInput === "")
    {
        message = "Please enter a number";
        resultDiv.classList.add("invalid");
    }
    else
    {
        const ageNum = Number(ageInput);
        if(ageNum < 0 || ageNum > 120)
        {
            message = "Please enter a realistic age";
            resultDiv.classList.add("invalid");
        }
        else if(ageNum < 18)
        {
            message = "You are a minor";
            resultDiv.className = "minor";
        }
        else
        {
            message = "You are an adult";
            resultDiv.className = "adult";
        }
    }
    resultDiv.textContent = message;
}
