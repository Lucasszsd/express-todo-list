import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
import { TaskQueryParams } from "./dto/task-query-params";
import { TaskRepository } from "./task.repository";
import { differenceInDays } from "date-fns";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    const Task = await this.taskRepository.create(createTaskDto);
    return Task;
  }

  async findAll(filterParams: TaskQueryParams) {
    console.log(filterParams);

    const queryRaw: Array<Prisma.TaskWhereInput> = [];

    if (Object.keys(filterParams).length > 0) {
      if (filterParams.longestDescription) {
        queryRaw.push({});
      }
      if (filterParams.status) {
        queryRaw.push({ status: filterParams.status });
      }
      if (filterParams.startConclusionDate && filterParams.endConclusionDate) {
        queryRaw.push({
          conclusion: {
            gte: new Date(filterParams.startConclusionDate),
            lte: new Date(filterParams.endConclusionDate),
          },
        });
      }
      if (filterParams.category_id) {
        queryRaw.push({ category_id: filterParams.category_id });
      }
      if (filterParams.user_id) {
        queryRaw.push({ user_id: filterParams.user_id });
      }
      if (filterParams.userIdFilterType) {
        if (filterParams.userIdFilterType === "TASK_QUANTITY") {
          queryRaw.push({});
        }
        if (filterParams.userIdFilterType === "OLDEST_TASK") {
          queryRaw.push({});
        }
        if (filterParams.userIdFilterType === "MOST_RECENT_TASK") {
          queryRaw.push({});
        }
      }
    }

    let mergedQuery: any = {};

    for (const query of queryRaw) {
      if (Object.keys(query).length === 0) continue;
      mergedQuery = { ...mergedQuery, ...query };
    }

    const query = { where: { AND: [mergedQuery] } };

    const task = await this.taskRepository.findAll(query);
    return task;
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Unable to find Task with id ${id}`);
    return task;
  }

  async getTaskConclusionAverage() {
    const tasks = await this.taskRepository.findAll({});
    // const average = tasks.reduce((acc, task) => {
    //   if (!task.conclusion) return acc;
    //   return acc + differenceInDays(task.conclusion, task.createdAt);
    // });

    let numberOfTasksWithConclusion = 0;

    const totalDays = tasks.reduce((acc, task) => {
      if (!task.conclusion) return acc;
      numberOfTasksWithConclusion++;
      return (acc +
        differenceInDays(task.conclusion as Date, task.createdAt)) as number;
    }, 0);

    const average = totalDays / numberOfTasksWithConclusion;

    return average;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.update(id, updateTaskDto);
    return task;
  }

  async remove(id: string) {
    await this.taskRepository.remove(id);
  }
}
