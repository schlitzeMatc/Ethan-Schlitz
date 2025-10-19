function declaredFunction() 
{
  console.log("I'm a declared function.");
}
const expressedFunction = function () 
{
  console.log("I'm an expressed function.");
};
function greet(name) 
{
  return `Hello, ${name}!`;
}
console.log(greet("Ethan"));

let globalVar = "I'm global";
function scopeTest() 
{
  let localVar = "I'm local";
  console.log(globalVar);
  console.log(localVar);
}
scopeTest();
const add = (a, b) => a + b;
console.log("Arrow Add:", add(5, 3));

function greet(name) 
{
    console.log("Hello, " + name + "!");
}

const farewell = function(name) 
{
    console.log("Goodbye, " + name + "!");
};
greet("Alice");
farewell("Bob");

console.log("Sum:", add(3, 5));

function showScope() 
{
    let localVar = "I'm local!";
    console.log(globalVar);
    console.log(localVar);
}
showScope();


const multiply = (x, y) => x * y;
console.log("Product:", multiply(4, 6));

function outer() 
{
    const outerVar = "Outer";
    function inner() 
    {
        console.log("Accessing:", outerVar);
    }
    inner();
}
outer();
