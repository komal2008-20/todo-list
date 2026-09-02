let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let counter = document.getElementById("taskCounter");

    let completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    counter.textContent =
        "Total Tasks: " + tasks.length + " | Completed: " + completedTasks;

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span onclick="completeTask(${index})">${task.text}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function editTask(index) {
    let newTask = prompt("Edit your task:", tasks[index].text);

    if (newTask === null) {
        return;
    }

    newTask = newTask.trim();

    if (newTask === "") {
        return;
    }

    tasks[index].text = newTask;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

displayTasks();

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function clearAllTasks() {
    if (tasks.length === 0) {
        return;
    }

    let confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}
