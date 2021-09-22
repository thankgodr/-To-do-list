export  class Task{
    #status_completed = false
    constructor(name){
        this.name = name;
    }

    updateStatus(status){
        this.#status_completed = status;
    }

    taskStatus(){
        return this.#status_completed;
    }

}