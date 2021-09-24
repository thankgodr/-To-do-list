export default class Task {
  completed = false;

  description;

  index;

  constructor(description) {
    this.description = description;
  }

  updateStatus(status = false) {
    this.completed = status;
  }

  updateIndex(index) {
    this.index = index;
  }

  taskStatus() {
    return this.completed;
  }

  updateDescription(des) {
    this.description = des;
  }
}
