//element creation
let tasks = 1;
console.log("=== Part A: Element Creation ===");
const demoDiv = document.createElement("div");
demoDiv.textContent = "This is a dynamically created div!";
console.log("Before modification:", demoDiv);
demoDiv.id = "demo-div";
demoDiv.style.color = "blue";
document.getElementById("output").appendChild(demoDiv);
console.log("After modification:", demoDiv);
//element styling
console.log("=== Part B: Styling ===");
demoDiv.style.fontWeight = "bold";
demoDiv.classList.add("styled");
console.log("Has class 'styled'? ", demoDiv.classList.contains("styled"));
demoDiv.classList.toggle("styled");
demoDiv.classList.remove("styled");
//element appending
console.log("=== Part C: Appending ===");
const parent = document.getElementById("output");
const p1 = document.createElement("p");
p1.textContent = "Paragraph 1";
const p2 = document.createElement("p");
p2.textContent = "Paragraph 2";
parent.appendChild(p1);
parent.prepend(p2);
const p3 = document.createElement("p");
p3.textContent = "Paragraph 3 (insertBefore)";
parent.insertBefore(p3, p1);
parent.removeChild(p1);
//to-do core functionality
function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();
    
    
    if (taskText === "") 
    {
        alert("Task cannot be empty.");
        return;
    }
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("pending");
    li.onclick = function () 
    {
        toggleTaskState(li);
    };

    document.getElementById("todo-list").appendChild(li);
    console.log(`Task added: "${taskText}".Total tasks: ${tasks}`);
    input.value = "";
    
    updateStats();
}
document.getElementById("add-task-btn").onclick = addTask;
//task state management
function toggleTaskState(taskItem) {
    if (taskItem.classList.contains("done")) 
    {
        taskItem.classList.remove("done");
        taskItem.classList.add("pending");
        console.log("Task marked as pending:", taskItem.textContent);
    } else 
    {
        taskItem.classList.remove("pending");
        taskItem.classList.add("done");
        console.log("Task marked as done:", taskItem.textContent);
    }
    updateStats();
}

function updateStats() 
{
    const allTasks = document.querySelectorAll("#todo-list li");
    const doneTasks = document.querySelectorAll("#todo-list li.done");
    tasks++;
    const output = document.getElementById("output");
    output.innerHTML = 
    `
    <p>Total tasks: ${allTasks.length}</p>
    <p>Completed tasks: ${doneTasks.length}</p>
    `;
    console.log(`Stats updated - Total: ${allTasks.length}, Completed: ${doneTasks.length}`);
}
