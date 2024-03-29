import { CreateTaskDto } from "./create-task.dto";

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export const updateTaskDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  priority: {
    type: "string",
    enum: ["LOW", "MEDIUM", "HIGH"],
  },
  status: {
    type: "string",
    enum: ["PENDING", "DOING", "DONE"],
  },
  category_id: {
    type: "string",
  },
  user_id: {
    type: "string",
  },
  conclusion: {
    type: "date",
  },
};
