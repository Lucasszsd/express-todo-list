export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  weight: number;
}

export const createUserDto = {
  name: {
    required: "name is required",
    minLength: 5,
    maxLength: 30,
  },
  email: {
    type: "email",
    required: "email is required",
  },
  password: {
    required: "password is required",
    minLength: 5,
    maxLength: 25,
  },
  weight: {
    required: "weight is required",
    min: 30,
    max: 300,
  },
};
