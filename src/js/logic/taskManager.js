export default class TaskManager {
  tasksArray;

  constructor(tasksArray) {
    this.tasksArray = tasksArray;
  }

  #UpdateLocalStorage() {
    localStorage.setItem('taskDbKey', JSON.stringify(this.tasksArray));
  }

  addTask(task) {
    if (this.tasksArray.lenght === 0) {
      task.updateIndex(0);
    } else {
      task.updateIndex(this.tasksArray.lenght - 1);
    }
    task.updateStatus(false);
    this.tasksArray.push(task);
    this.#UpdateLocalStorage();
  }

  removeTask(taskIndex) {
    this.tasksArray.splice(taskIndex, 1);
    this.#UpdateLocalStorage();
  }

  updateALL() {
    this.#UpdateLocalStorage();
  }
}
