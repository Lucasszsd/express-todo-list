import { NotFoundException } from "../common/exception/types/not-found-exception";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
import { TaskRepository } from "./task.repository";

export class TaskService {
  private taskRepository: TaskRepository;
  constructor(TaskRepository: TaskRepository) {
    this.taskRepository = TaskRepository;
  }

  async create(createTaskDto: CreateTaskDto) {
    const createTaskProps = {
      title: createTaskDto.title ?? undefined,
      user_id: createTaskDto.user_id ?? undefined,
      category_id: createTaskDto.category_id ?? undefined,
      description: createTaskDto.description ?? undefined,
      status: createTaskDto.status ?? undefined,
      priority: createTaskDto.priority ?? undefined,
    } as CreateTaskDto;

    const Task = await this.taskRepository.create(createTaskProps);
    return Task;
  }

  async findAll() {
    const Tasks = await this.taskRepository.findAll();
    return Tasks;
  }

  async findOne(id: string) {
    const Task = await this.taskRepository.findOne(id);
    if (!Task) throw new NotFoundException(`Unable to find Task with id ${id}`);
    return Task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const Task = await this.taskRepository.update(id, updateTaskDto);
    return Task;
  }

  async remove(id: string) {
    await this.taskRepository.remove(id);
  }
}
