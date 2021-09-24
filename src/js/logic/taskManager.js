export default class TaskManager {
  tasksArray;

  constructor(tasksArray) {
    this.tasksArray = tasksArray;
  }

  #UpdateLocalStorage() {
    this.tasksArray.forEach((tmtask, tmindex) => {
      tmtask.index = tmindex + 1;
    });
    localStorage.setItem('taskDbKey', JSON.stringify(this.tasksArray));
  }

  addTask(task) {
    if (this.tasksArray.lenght === 0) {
      task.updateIndex(1);
    } else {
      task.updateIndex(this.tasksArray.lenght);
    }
    task.updateStatus(false);
    this.tasksArray.push(task);
    this.#UpdateLocalStorage();
  }

  removeTask(taskIndex) {
    this.tasksArray.splice(taskIndex, 1);
    this.#UpdateLocalStorage();
  }

  updateSingleTask(task, taskIndex) {
    this.tasksArray[taskIndex] = task;
    this.#UpdateLocalStorage();
  }

  updateALL() {
    this.#UpdateLocalStorage();
  }
}
