import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class UpdateTasStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
