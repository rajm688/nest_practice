import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entities';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  //  Getting All Tasks
  async getTasks(filterDto: GetFilterdTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }
  //   creating new Task
  createNewTask(createTaskDto: CreateTasksDto, user: User): Promise<Task> {
    return this.taskRepository.createNewTask(createTaskDto, user);
  }
  // getting Task by ID
  async getTaskById(id: string, user: User): Promise<Task> {
    // whenever we are interacting with database it is a async operation
    const foundTask = await this.taskRepository.findOne({
      where: { id, user },
    });
    if (!foundTask) {
      throw new NotFoundException('outch..! result not found');
    }
    return foundTask;
  }

  // //   Deleting Task
  async DeleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} is not avilable`);
    }
  }
  // updating Task
  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
