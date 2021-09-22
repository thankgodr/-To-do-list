import { TaskManager } from './logic/taskManager';
import { Task } from './models/task';
import '../css/style.css';

var taskManager = null;

function printInitialTasks(){
    console.log("PrintTask was called");
    let savedTasked = JSON.parse(localStorage.getItem('taskDbKey'));
    if(savedTasked == null){
        savedTasked = [];
    }
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    taskManager = new TaskManager(savedTasked);
    taskManager.tasksArray.forEach(task => {
        let listViewItem = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = task.completed;
        listViewItem.appendChild(checkbox);
        listViewItem.appendChild(document.createTextNode(task.description));
        taskList.appendChild(listViewItem);
    });
}
printInitialTasks();

function addTask(taskTitle){
    const singleTask = new Task(taskTitle)
    singleTask.index = taskManager.tasksArray.lenght;
    taskManager.addTask(singleTask);
}

function deleteTask(taskIndex){
    taskManager.deleteTask(taskIndex);
}


document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const inputTitle = document.getElementById('newTask');
        addTask(inputTitle.value);
        console.log("Key was pressed");
        printInitialTasks();
    }else{
        console.log("tesdkkdf");
    }
});