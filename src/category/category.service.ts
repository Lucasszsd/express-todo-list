import { NotFoundException } from "../common/exception/types/not-found-exception";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async create(createcategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createcategoryDto);
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
