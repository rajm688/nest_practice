import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entities';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
