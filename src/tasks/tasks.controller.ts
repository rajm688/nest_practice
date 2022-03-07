import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
import { UpdateTasStatusDto } from './DTO/update-task-status.dto';
import { Task } from './task.entities';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetFilterdTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `user${user.username} retriving all tasks, Filtered: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }
  // Create New Task
  @Post()
  // createnewTask(@Body() body){
  // createnewTask(@Body("title") title :string,@Body("desc") desc : string):Task{
  createnewTask(
    @Body() createTaskDto: CreateTasksDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `user ${user.username} creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    // console.log(title,desc)
    // console.log(body)
    return this.tasksService.createNewTask(createTaskDto, user);
  }
  //Get Task By ID
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.DeleteTask(id, user);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() udateTaskStatusDto: UpdateTasStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = udateTaskStatusDto;
    return this.tasksService.updateTask(id, status, user);
  }
}
