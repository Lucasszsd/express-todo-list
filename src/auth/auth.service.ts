import { UnauthorizedException } from "../common/exception/types/unauthorized.exception";
import { UserService } from "../user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { LoginDto } from "./dto/login.dto";
import { JWT_SECRET } from "../common/constants/constants";
import { CreateUserDto } from "../user/dto";
import { BadRequestException } from "../common/exception/types/bad-request.exception";
import { UserEntity } from "../user/entities/user.entity";

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException("Usuário ou senha inválidos");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException("Usuário ou senha inválidos");

    const token = this.signToken(user);

    return { access_token: token };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = (await this.userService.create(createUserDto)) as any;

    const token = this.signToken(user);

    return { ...user, access_token: token };
  }

  private signToken(user: Partial<UserEntity>) {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}
