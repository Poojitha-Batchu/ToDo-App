// Retrieve tasks from localStorage or initialize if it doesn't exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let editMode = false; // Flag to track edit mode

// Function to add or edit a task
function addTask() {
    const taskInput = document.getElementById("input-box");
    const taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        if (editMode) {
            // If in edit mode, update the task
            const index = parseInt(taskInput.dataset.index);
            tasks[index].name = taskValue;
            editMode = false;
            document.getElementById("addBtn").innerText = "Add";
        } else {
            // If not in edit mode, add a new task
            tasks.push({
                name: taskValue,
                completed: false, // Set the completed status to false for new tasks
            });
        }
        taskInput.value = "";
        updateTaskLists();
        saveTasksToLocalStorage();
    } else{
        alert('You must enter something!...');
    }
}

// Function to enter edit mode
function enterEditMode(index) {
    const taskInput = document.getElementById("input-box");
    taskInput.value = tasks[index].name;
    taskInput.dataset.index = index;
    editMode = true;
    document.getElementById("addBtn").innerText = "Edit";
}

// Function to update the task lists
function updateTaskLists() {
    const allTasksList = document.getElementById("allTasks");
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");
    allTasksList.innerHTML = "";
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = task.name;
        const tempItem= document.createElement("li");
        tempItem.innerText= task.name;
        if (task.completed) {
            listItem.classList.add("checked");
            tempItem.classList.add("checked");
        }

        const itemBtn = document.createElement("div");
        itemBtn.className = "item-btn";

        const editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square";
        editIcon.addEventListener("click", () => {
            enterEditMode(index); // Enter edit mode when clicking on the edit icon
        });

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-xmark";
        deleteIcon.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTaskLists();
            saveTasksToLocalStorage();
        });

        itemBtn.appendChild(editIcon);
        itemBtn.appendChild(deleteIcon);

        listItem.appendChild(itemBtn);

        listItem.addEventListener("click", () => {
            if (event.target !== editIcon && event.target !== deleteIcon) {
                listItem.classList.toggle("checked");
                tasks[index].completed = !tasks[index].completed;
                updateTaskLists();
                saveTasksToLocalStorage();
            }
        });

        allTasksList.appendChild(listItem);

        if (task.completed) {
            completedTasksList.appendChild(tempItem);
        } else {
            pendingTasksList.appendChild(tempItem);
        }
    });
}

// Initial update of the task lists
updateTaskLists();
