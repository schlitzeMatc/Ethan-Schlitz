document.getElementById("addBtn").addEventListener("click", () => handleOperation("add"));
document.getElementById("subtractBtn").addEventListener("click", () => handleOperation("subtract"));
document.getElementById("multiplyBtn").addEventListener("click", () => handleOperation("multiply"));
document.getElementById("divideBtn").addEventListener("click", () => handleOperation("divide"));

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", (event) => {
    const output = document.getElementById("output");
    output.innerHTML += `<p>Clicked button: ${event.target.id}</p>`;
    console.log("Event type:", event.type);
    console.log("Target:", event.target);
    console.log("CurrentTarget:", event.currentTarget);
  });
});



function getNumbers() {
  const num1 = document.getElementById("number1").value.trim();
  const num2 = document.getElementById("number2").value.trim();

  if (num1 === "" || num2 === "") {
    showResult("Please enter both numbers.");
    return null;
  }

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    showResult("Inputs must be valid numbers.");
    return null;
  }

  return [a, b];
}

function handleOperation(operation) {
  clearResult();

  const numbers = getNumbers();
  if (!numbers) return;

  const [a, b] = numbers;
  let result;

  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) {
        showResult("Error: Cannot divide by zero.");
        return;
      }
      result = a / b;
      break;
    default:
      showResult("Unknown operation.");
      return;
  }

  showResult(`Result: ${result}`);
}



function showResult(message) {
  document.getElementById("result").textContent = message;
}

function clearResult() {
  document.getElementById("result").textContent = "";
}