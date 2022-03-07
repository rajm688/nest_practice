import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
import { UpdateTasStatusDto } from './DTO/update-task-status.dto';
import { Task } from './task.entities';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetFilterdTaskDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  // Create New Task
  @Post()
  // createnewTask(@Body() body){
  // createnewTask(@Body("title") title :string,@Body("desc") desc : string):Task{
  createnewTask(@Body() createTaskDto: CreateTasksDto): Promise<Task> {
    // console.log(title,desc)
    // console.log(body)
    return this.tasksService.createNewTask(createTaskDto);
  }
  //Get Task By ID
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.DeleteTask(id);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() udateTaskStatusDto: UpdateTasStatusDto,
  ): Promise<Task> {
    const { status } = udateTaskStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}
