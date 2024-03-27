import { Priority, Status } from "@prisma/client";

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category_id?: string;
  conclusion?: Date;
  user_id: string;
}
