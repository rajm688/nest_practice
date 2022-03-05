import { TaskStatus } from '../task.model';

export class GetFilterdTaskDto {
  status?: TaskStatus;
  search?: string;
}
