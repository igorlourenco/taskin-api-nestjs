import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly tasks: Model<Task>) {}

  async getAll(userId: string) {
    return await this.tasks.find({ userId }).exec();
  }

  async getById(id: string) {
    return await this.tasks.findById(id).exec();
  }

  async create(task: Task) {
    const createdTask = new this.tasks(task);
    return await createdTask.save();
  }

  async update(id: string, task: Task) {
    await this.tasks.updateOne({ _id: id }, task).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    await this.tasks.deleteOne({ _id: id }).exec();
  }
}
