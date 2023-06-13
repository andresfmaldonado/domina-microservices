import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({cmd: 'save_task'})
  saveTask(saveTaskDto) {
    return this.tasksService.save(saveTaskDto);
  }

  @MessagePattern({cmd: 'delete_task'})
  deleteTask(deleteTaskDto) {
    return this.tasksService.delete(deleteTaskDto);
  }

  @MessagePattern({cmd: 'get_tasks'})
  getTasks() {
    return this.tasksService.findAll();
  }
}
