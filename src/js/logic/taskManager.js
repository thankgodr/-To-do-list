export class TaskManager{
    tasksArray;

    constructor(tasksArray){
        this.tasksArray = tasksArray
    }

    #UpdateLocalStorage(){
        localStorage.setItem("taskDbKey", JSON.stringify(this.tasksArray));
    }
    
    addTask(task){
        this.tasksArray.push(task);
        this.#UpdateLocalStorage();
    }
    removeTask(taskIndex){
        this.tasksArray.splice(taskIndex, 1);
        this.#UpdateLocalStorage();
    }
}