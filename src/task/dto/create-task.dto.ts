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

export const createTaskDto = {
  title: {
    type: "string",
    required: "title is required",
  },
  description: {
    type: "string",
  },
  priority: {
    type: "string",
    required: "priority is required",
    enum: Object.values(Priority),
  },
  status: {
    type: "string",
    required: "status is required",
    enum: Object.values(Status),
  },
  conclusion: {
    type: "date",
    required: "conclusion date is required",
  },
  category_id: {
    type: "string",
    required: "category_id is required",
  },
  user_id: {
    type: "string",
    required: "user_id is required",
  },
};
