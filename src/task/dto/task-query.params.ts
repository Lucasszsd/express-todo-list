import { Status } from "../entities/task.entity";

export interface TaskQueryParams {
  longestDescription?: boolean;
  status?: Status;
  user_id?: string;
  category_id?: string;
  startConclusionDate?: string;
  endConclusionDate?: string;
}
