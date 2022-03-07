import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
import { Task } from './task.entities';
import { TaskStatus } from './task.status.enum';
import { InternalServerErrorException, Logger } from '@nestjs/common';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository', { timestamp: true });
  async getTasks(filterDto: GetFilterdTaskDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        `(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.desc) like LOWER(:search))`,
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for uer ${
          user.username
        }, filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  async createNewTask(
    createTaskDto: CreateTasksDto,
    user: User,
  ): Promise<Task> {
    const { title, desc } = createTaskDto;
    const newTask = this.create({
      title,
      desc,
      status: TaskStatus.Active,
      user,
    });
    await this.save(newTask);
    return newTask;
  }
}
