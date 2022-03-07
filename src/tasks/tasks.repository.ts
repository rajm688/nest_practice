import { EntityRepository, Repository } from 'typeorm';
import { CreateTasksDto } from './DTO/create-task-dto';
import { GetFilterdTaskDto } from './DTO/get-tasks-dto';
import { Task } from './task.entities';
import { TaskStatus } from './task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetFilterdTaskDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        `LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.desc) like LOWER(:search)`,
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createNewTask(createTaskDto: CreateTasksDto): Promise<Task> {
    const { title, desc } = createTaskDto;
    const newTask = this.create({
      title,
      desc,
      status: TaskStatus.Active,
    });
    await this.save(newTask);
    return newTask;
  }
}
