import { Status } from "../entities/task.entity";

export interface TaskQueryParams {
  longestDescription?: boolean;
  status?: Status;
  userIdFilterType?: userIdFilterType;
  user_id?: string;
  category_id?: string;
  startConclusionDate?: string;
  endConclusionDate?: string;
}

enum userIdFilterType {
  TASK_QUANTITY = "TASK_QUANTITY",
  OLDEST_TASK = "OLDEST_TASK",
  MOST_RECENT_TASK = "MOST_RECENT_TASK",
}
