import { BadRequestException } from "../common/exception/types/bad-request.exception";
import { NotFoundException } from "../common/exception/types/not-found.exception";
import { mergeObjects } from "../common/utils/merge-objects";
import { TaskEntity } from "../task/entities/task.entity";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findByEmail(createUserDto.email);

    if (!!userExists) {
      throw new BadRequestException("User already exists with this email");
    }

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string, queryParams: any) {
    if (!queryParams.userIdFilterType) {
      const user = await this.userRepository.findOne(id);
      if (!user)
        throw new NotFoundException(`Unable to find user with id ${id}`);
      return user;
    }

    const user = await this.userRepository.findOneWithTask(id);

    if (!user) throw new NotFoundException(`Unable to find user with id ${id}`);

    if (user.tasks.length === 0) {
      return user;
    }

    const { tasks, ...userWithoutTasks } = user;

    if (queryParams.userIdFilterType === "TASK_QUANTITY") {
      return { userWithoutTasks, taskQuantity: tasks.length };
    }

    tasks.sort(
      (a: any, b: any) => a.createdAt.getTime() - b.createdAt.getTime(),
    );

    if (queryParams.userIdFilterType === "OLDEST_TASK") {
      return { userWithoutTasks, oldestTask: tasks[0] };
    }
    if (queryParams.userIdFilterType === "MOST_RECENT_TASK") {
      return { userWithoutTasks, mostRecentTask: tasks[tasks.length - 1] };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    await this.userRepository.remove(id);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
