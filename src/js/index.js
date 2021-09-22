import { TaskManager } from './logic/taskManager';
import { Task } from './models/task';

var taskManager = null;

function printInitialTasks(){
    console.log("PrintTask was called");
    let savedTasked = JSON.parse(localStorage.getItem('taskDbKey'));
    if(savedTasked == null){
        savedTasked = [];
    }
    taskManager = new TaskManager(savedTasked);
    taskManager.tasksArray.forEach(task => {
        console.log(task.name);
    });
}
printInitialTasks();

function addTask(taskTitle){
    const singleTask = new Task(taskTitle)
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