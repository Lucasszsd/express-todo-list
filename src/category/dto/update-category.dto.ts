import { Color } from "../entities/category.entity";
import { CreateCategoryDto } from "./create-category.dto";

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export const updateCategoryDto = {
  name: {
    type: "string",
  },
  color: {
    type: "string",
    enum: Object.values(Color),
  },
};
