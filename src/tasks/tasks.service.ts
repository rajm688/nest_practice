import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from "uuid"
@Injectable()
export class TasksService {
    private tasks:Task[] = []
getAllTasks():Task[]{
    return this.tasks
}
createNewTask(title:string, desc:string):Task{
const newTask:Task = {
    id : uuid(),
    title,
    desc,
    status:TaskStatus.Active
}
this.tasks.push(newTask)
return newTask
}
}
