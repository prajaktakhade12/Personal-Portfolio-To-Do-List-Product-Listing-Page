document.addEventListener("DOMContentLoaded", loadTasks);

let deletedTasks = [];

// Load tasks from localStorage on page load
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
    deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
}

// Add new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task) {
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = "";
    }
}

// Display task in the list
function addTaskToDOM(task, isDeleted = false) {
    const taskList = isDeleted ? document.getElementById("deletedTaskList") : document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.onclick = () => editTask(li, task);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => deleteTask(li, task);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Edit task
function editTask(element, oldTask) {
    const newTask = prompt("Edit Task:", oldTask);
    if (newTask) {
        element.firstChild.textContent = newTask;
        updateTaskInStorage(oldTask, newTask);
    }
}

// Update task in localStorage
function updateTaskInStorage(oldTask, newTask) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldTask);
    if (index > -1) {
        tasks[index] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Delete task
function deleteTask(element, task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(task);
    if (index > -1) tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Move to deleted tasks list
    deletedTasks.push(task);
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    
    element.remove();
}

// Retrieve deleted tasks
function retrieveDeletedTasks() {
    const deletedTaskList = document.getElementById("deletedTaskList");
    deletedTaskList.innerHTML = "";
    deletedTasks.forEach(task => addTaskToDOM(task, true));
}

// Delete all tasks
function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("tasks");
        localStorage.removeItem("deletedTasks");
        document.getElementById("taskList").innerHTML = "";
        document.getElementById("deletedTaskList").innerHTML = "";
        deletedTasks = [];
    }
}
