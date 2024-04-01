enum userIdFilterType {
  TASK_QUANTITY = "TASK_QUANTITY",
  OLDEST_TASK = "OLDEST_TASK",
  MOST_RECENT_TASK = "MOST_RECENT_TASK",
}

export interface QueryParams {
  userIdFilterType: userIdFilterType;
}
