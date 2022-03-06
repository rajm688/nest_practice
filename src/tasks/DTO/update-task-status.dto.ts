import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTasStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
