import { CreateUserDto, createUserDto } from "./create-user.dto";

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export const updateUserDto = {
  name: {
    minLength: 5,
    maxLength: 25,
  },
  email: {
    type: "email",
  },
  password: {
    minLength: 5,
    maxLength: 25,
  },
  weight: {
    min: 30,
    max: 300,
  },
};
