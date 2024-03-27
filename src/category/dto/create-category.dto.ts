import { Color } from "../entities/category.entity";

export interface CreateCategoryDto {
  name: string;
  color: Color;
}
