import { NotFoundException } from "../common/exception/types/not-found-exception";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { CategoryRepository } from "./category.repository";
import { BadRequestException } from "../common/exception/types/bad-request.exception";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const createCategoryProps = {
      name: createCategoryDto.name ?? undefined,
      color: createCategoryDto.color ?? undefined,
    } as CreateCategoryDto;

    if (Object.values(createCategoryProps).includes(undefined))
      throw new BadRequestException("Missing required fields on category");

    const category = await this.categoryRepository.create(createCategoryProps);
    return category;
  }

  async findAll() {
    const categorys = await this.categoryRepository.findAll();
    return categorys;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne(id);
    if (!category)
      throw new NotFoundException(`Unable to find category with id ${id}`);
    return category;
  }

  async update(id: string, updatecategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.update(
      id,
      updatecategoryDto,
    );
    return category;
  }

  async remove(id: string) {
    await this.categoryRepository.remove(id);
  }
}
