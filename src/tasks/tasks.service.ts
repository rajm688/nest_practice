import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  //   getting all Tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }
  //   creating new Task
  createNewTask(CreateTaskDto: CreateTasksDto): Task {
    const { title, desc } = CreateTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.Active,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  // getting Task by ID
  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException('Outch.! Task not found');
    }
    return foundTask;
  }
  //   Deleting Task
  DeleteTask(id: string) {
    const foundtTask = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != foundtTask.id);
    return 'deleted Successfully';
  }
  //   updating Task
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  //    filtering Tasks
  getTasksWithFilters(filterDto: GetFilterdTaskDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.desc.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
