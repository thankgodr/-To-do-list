import TaskManager from './logic/taskManager';
import Task from './models/task';
import '../css/style.css';

let taskManager = null;

function deleteTask(deleteIndex) {
  taskManager.removeTask(deleteIndex);
}

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
        task.completed = true;
        taskManager.updateALL();
      } else {
        task.completed = false;
        taskManager.updateALL();
      }
    });
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'fas fa-trash pull-right delete';
    deleteBtn.addEventListener('click', () => {
      deleteTask(loopIndex);
      printInitialTasks();
    });

    const span = document.createElement('span');
    span.className = 'fas fa-ellipsis-v pull-right';
    span.addEventListener('click', () => {});

    const pTag = document.createElement('span');
    pTag.contentEditable = true;
    pTag.appendChild(document.createTextNode(task.description));
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        if (document.activeElement === pTag) {
          task.description = pTag.innerText;
          taskManager.updateSingleTask(task, loopIndex);
          pTag.contentEditable = false;
          pTag.contentEditable = true;
        }
      }
    });

    listViewItem.appendChild(checkbox);
    listViewItem.appendChild(pTag);
    listViewItem.appendChild(span);
    listViewItem.appendChild(deleteBtn);
    taskList.appendChild(listViewItem);
  });
}
printInitialTasks();

function removeALlCompleted() {
  const tempArr = taskManager.tasksArray.filter((task) => !task.completed);
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
  const inputTitle = document.getElementById('newTask');
  if (document.activeElement === inputTitle) {
    if (event.keyCode === 13) {
      addTask(inputTitle.value);
      inputTitle.value = '';
      printInitialTasks();
    }
  }
});
