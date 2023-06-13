import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  
  constructor (
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  save(saveTaskDto): Promise<Task> {
    console.log(saveTaskDto);
    let task;
    if (saveTaskDto.id !== undefined) {
      task = this.taskModel.findOne(saveTaskDto.id);

      task.name = saveTaskDto.name;
      task.description = saveTaskDto.description;
      task.user = saveTaskDto.user;
    } else {
      task = new this.taskModel(saveTaskDto);
    }

    return task.save();
  }

  delete(deleteTaskDto) {
    return this.taskModel.deleteOne(deleteTaskDto.id);
  }

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}
