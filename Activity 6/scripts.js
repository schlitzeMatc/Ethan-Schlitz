let tasks = [];
let taskIdCounter = 0;

function createTaskElement(task) 
{
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) li.classList.add("completed");
    li.dataset.id = task.id;
    const priorityBar = document.createElement("div");
    priorityBar.classList.add("task-priority", `priority-${task.priority}`);
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.classList.add("task-text");
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.classList.add("task-btn", "toggle-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("task-btn", "delete-btn");
    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(priorityBar);
    li.appendChild(textSpan);
    li.appendChild(actionsDiv);
    return li;
}
function addTask() 
{
    const input = document.getElementById("task-input");
    const priority = document.getElementById("prioritySelect").value;
    const taskText = input.value.trim();
    if (taskText === "")
    {
        alert("Task cannot be empty!");
        return;
    }
    const newTask = 
    {
        id: ++taskIdCounter,
        text: taskText,
        priority: priority,
        completed: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    renderTasks();
    updateTaskStats();
    input.value = "";
}

function toggleTaskStatus(taskId) 
{
    const task = tasks.find((t) => t.id === taskId);
    if (task) 
    {
        task.completed = !task.completed;
        renderTasks();
        updateTaskStats();
    }
}


function deleteTask(taskId) 
{
    if (!confirm("Delete this task?")) return;
    tasks = tasks.filter((t) => t.id !== taskId);
    renderTasks();
    updateTaskStats();
}

function filterTasks(filterType) 
{
    document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
    document
    .querySelector(`[data-filter="${filterType}"]`)
    .classList.add("active");
    renderTasks(filterType);
}


function renderTasks(filter = "all") 
{
    const list = document.getElementById("todo-list");
    const emptyState = document.getElementById("emptyState");
    list.innerHTML = "";
    let filtered = tasks;
    if (filter === "pending") filtered = tasks.filter((t) => !t.completed);
    if (filter === "completed") filtered = tasks.filter((t) => t.completed);
    filtered.forEach((task) => 
    {
        const li = createTaskElement(task);
        list.appendChild(li);
    });
    emptyState.classList.toggle("hidden", filtered.length > 0);
}

function updateTaskStats() 
{
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    console.log(`Stats updated → Total: ${total}, Completed: ${completed}`);
}


document.getElementById("add-task-btn").addEventListener("click", addTask);
document
.getElementById("todo-list")
.addEventListener("click", function (e) {
const li = e.target.closest(".task-item");
if (!li) return;
const id = parseInt(li.dataset.id);
if (e.target.classList.contains("toggle-btn")) toggleTaskStatus(id);
if (e.target.classList.contains("delete-btn")) deleteTask(id);
});
document.querySelectorAll(".filter-btn").forEach((btn) =>
btn.addEventListener("click", () => filterTasks(btn.dataset.filter))
);

document.getElementById("markAllDoneBtn").addEventListener("click", () => 
{
    tasks.forEach((t) => (t.completed = true));
    renderTasks();
    updateTaskStats();
});

document.getElementById("deleteCompletedBtn").addEventListener("click", () => 
{
    tasks = tasks.filter((t) => !t.completed);
    renderTasks();
    updateTaskStats();
});

document.getElementById("clearAllBtn").addEventListener("click", () => 
{
    if (confirm("Clear all tasks?")) 
    {
        tasks = [];
        renderTasks();
        updateTaskStats();
    }
});


renderTasks();
updateTaskStats();

