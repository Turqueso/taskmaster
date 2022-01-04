import { Task, TaskEntity } from "./Task";

export enum TASKSTATUS {
  COMPLETED,
  PENDING,
}

interface TaskListEntity {
  [key: string]: TaskEntity;
}

export class TasksList {
  private _list: TaskListEntity;

  constructor() {
    this._list = {};
  }

  get toArray() {
    return Object.values(this._list);
  }

  loaddB(tasks: TaskEntity[]) {
    tasks.map((task) => {
      this._list[task.id] = task;
    });
  }

  deleteTask(id: string) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  createTask(desc: string) {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  showList(status: TASKSTATUS.COMPLETED | TASKSTATUS.PENDING | null = null) {
    let list = this.toArray;

    if (status === TASKSTATUS.COMPLETED) {
      list = list.filter((task) => {
        return task.completed;
      });
    }

    if (status === TASKSTATUS.PENDING) {
      list = list.filter((task) => {
        return !task.completed;
      });
    }

    list.map((task, index) => {
      // TODO: sustituir por signale?
      // https://github.com/klaussinani/signale
      // https://www.npmjs.com/package/figures
      console.log(
        `${(index + 1).toString().white}. ${
          task.completed ? "✔ ".green : "☐ ".magenta
        } ${task.desc} ${
          task.completed !== null ? `(${task.completed})`.gray : ""
        }`
      );
    });
  }

  toggleCompleteTask(completedIds: string[] = []) {
    completedIds.map((id) => {
      // Object.keys(this._list).map((key) => {
      // if (completedIds.includes(key)) {
      //   console.log(this._list[key]);
      //   console.log(this._list[key] instanceof Task);
      //   this._list[key].markComplete();
      // } else {
      //   this._list[key].markIncomple();
      // }
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date();
      }
    });

    this.toArray.map((task) => {
      if (!completedIds.includes(task.id)) {
        this._list[task.id].completed = null;
      }
    });
  }
}
