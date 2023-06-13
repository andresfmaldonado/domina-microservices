import { Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices/client';
import { Ctx, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PUBSUB') private readonly client: ClientProxy,
  ) {}
  @Post('users/create')
  async createUser(@Payload() createUser) {
    return await this.client.send({cmd: 'create_user'}, createUser).toPromise();
  }

  @Post('login')
  async login(@Payload() signInDto) {
    return await this.client.send({cmd: 'login'}, signInDto).toPromise();
  }

  @Post('tasks/save')
  async saveTask(@Payload() saveTask) {
    const task = await this.client.send({cmd: 'save_task'}, saveTask).toPromise();
    const users = await this.client.send({cmd: 'get_users'}, {page: 1, items: 10}).toPromise();

    return {
      taskId: task._id,
      taskName: task.name,
      description: task.description,
      user: users.find((u) => u._id === task.user).name ?? '',
    };
  }

  @Delete('tasks/delete/:id')
  async deleteTask(@Payload() id) {
       const task = await this.client.send({cmd: 'delete_task'}, id);

       return task;
  }

  @Get('tasks')
  async getTasks() {
    return await this.client.send({cmd: 'get_tasks'}, {page:1, items:10}).toPromise();
  }
}
