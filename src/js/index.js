import { TaskManager } from "./logic/taskManager";
import { Task } from "./models/task";
import "../css/style.css";

let taskManager = null;

function printInitialTasks() {
  console.log("PrintTask was called");
  let savedTasked = JSON.parse(localStorage.getItem("taskDbKey"));
  if (savedTasked == null) {
    savedTasked = [];
  }
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  taskManager = new TaskManager(savedTasked);
  taskManager.tasksArray.forEach((task) => {
    let listViewItem = document.createElement("li");
    listViewItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "name";

    checkbox.className = "form-check-input pull-left";
    checkbox.style.marginRight = "17px";
    checkbox.value = task.completed;

    let span = document.createElement("span");
    span.className = "fas fa-ellipsis-v pull-right";
    listViewItem.appendChild(checkbox);
    listViewItem.appendChild(document.createTextNode(task.description + "  "));
    listViewItem.appendChild(span);
    taskList.appendChild(listViewItem);
  });
}
printInitialTasks();

function addTask(taskTitle) {
  const singleTask = new Task(taskTitle);
  singleTask.index = taskManager.tasksArray.lenght;
  taskManager.addTask(singleTask);
}

function deleteTask(taskIndex) {
  taskManager.deleteTask(taskIndex);
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const inputTitle = document.getElementById("newTask");
    addTask(inputTitle.value);
    console.log("Key was pressed");
    printInitialTasks();
  } else {
    console.log("tesdkkdf");
  }
});
