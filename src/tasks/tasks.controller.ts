import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks():Task[]{
        return this.tasksService.getAllTasks()
    }

    @Post()
    // createnewTask(@Body() body){
        createnewTask(@Body("title") title :string,@Body("desc") desc : string):Task{
        // console.log(title,desc)
        // console.log(body)
        return this.tasksService.createNewTask(title,desc)
}
}