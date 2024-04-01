import { Prisma } from "@prisma/client";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
import { TaskQueryParams } from "./dto/task-query.params";
import { TaskRepository } from "./task.repository";
import { differenceInDays } from "date-fns";
import { mergeObjects } from "../common/utils/merge-objects";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    const Task = await this.taskRepository.create(createTaskDto);
    return Task;
  }

  async findAll(filterParams: TaskQueryParams) {
    if (Object.keys(filterParams).length === 0) {
      return await this.taskRepository.findAll({});
    }

    const queryRaw: Array<Prisma.TaskWhereInput> = [];

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

    const query = mergeObjects(queryRaw);

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
