import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TaskService {
  tasks: Task[] = [
    { id: 1, description: 'Estudar NestJS', isCompleted: false },
    { id: 2, description: 'Ver o Mundial', isCompleted: false },
    { id: 3, description: 'Ver Super Bowl', isCompleted: false },
  ];

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    return this.tasks.find((task: Task) => task.id === Number(id));
  }

  create(task: Task) {
    let taskId = 0;
    if (this.tasks.length > 0) {
      taskId = this.tasks[this.tasks.length - 1].id + 1;
    }

    task.id = taskId;

    this.tasks.push(task);

    return task;
  }

  update(task: Task) {
    const taskToUpdate = this.getById(task.id);
    if (taskToUpdate) {
      taskToUpdate.description = task.description;
      taskToUpdate.isCompleted = task.isCompleted;
    }

    return taskToUpdate;
  }

  delete(id: number) {
    const index = this.tasks.findIndex((task) => task.id === Number(id));

    this.tasks.splice(index, 1);
  }
}
