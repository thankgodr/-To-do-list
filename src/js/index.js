import TaskManager from './logic/taskManager';
import Task from './models/task';
import '../css/style.css';

let taskManager = null;

function printInitialTasks() {
  let savedTasked = JSON.parse(localStorage.getItem('taskDbKey'));
  if (savedTasked == null) {
    savedTasked = [];
  }
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  taskManager = new TaskManager(savedTasked);

  taskManager.tasksArray.forEach((task, loopIndex) => {
    const listViewItem = document.createElement('li');
    listViewItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'name';

    checkbox.className = 'form-check-input pull-left';
    checkbox.style.marginRight = '17px';
    checkbox.value = task.completed;
    if (task.completed) {
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        console.log('ischecked');
        task.completed = true;
        taskManager.updateALL();
        console.log(task.completed);
      } else {
        console.log('not checked');
        task.completed = false;
        taskManager.updateALL();
        console.log(task.completed);
      }
    });

    const span = document.createElement('span');
    span.className = 'fas fa-ellipsis-v pull-right';
    span.addEventListener('click', () => {
      deleteTask(loopIndex);
    });

    listViewItem.appendChild(checkbox);
    listViewItem.appendChild(document.createTextNode(task.description));
    listViewItem.appendChild(span);
    taskList.appendChild(listViewItem);
  });
}
printInitialTasks();

function deleteTask(deleteIndex) {
  taskManager.removeTask(deleteIndex);
  printInitialTasks();
}

function removeALlCompleted() {
  let tempArr = taskManager.tasksArray.filter((task) => {
    return !task.completed;
  });
  taskManager.tasksArray = tempArr;
  taskManager.updateALL();
  printInitialTasks();
}

function addTask(taskTitle) {
  const singleTask = new Task(taskTitle);
  singleTask.index = taskManager.tasksArray.lenght;
  taskManager.addTask(singleTask);
}

document.getElementById('clearCompleted').addEventListener('click', () => {
  removeALlCompleted();
});

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const inputTitle = document.getElementById('newTask');
    addTask(inputTitle.value);

    printInitialTasks();
  }
});
