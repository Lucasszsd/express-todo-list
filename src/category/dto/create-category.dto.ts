import { Color } from "../entities/category.entity";

export interface CreateCategoryDto {
  name: string;
  color: Color;
}

export const createCategoryDto = {
  name: {
    type: "string",
    required: "name is required",
  },
  color: {
    type: "string",
    required: "Color is required",
    enum: Object.values(Color),
  },
};
