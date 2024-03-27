import { BadRequestException } from "../common/exception/types/bad-request.exception";
import { NotFoundException } from "../common/exception/types/not-found-exception";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: CreateUserDto) {
    const createUserProps = {
      name: createUserDto.name ?? undefined,
      email: createUserDto.email ?? undefined,
      password: createUserDto.password ?? undefined,
      weight: createUserDto.weight ?? undefined,
    } as CreateUserDto;

    if (Object.values(createUserProps).includes(undefined))
      throw new BadRequestException("Missing required fields on user");

    const user = await this.userRepository.create(createUserProps);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`Unable to find user with id ${id}`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: string) {
    await this.userRepository.remove(id);
  }
}
