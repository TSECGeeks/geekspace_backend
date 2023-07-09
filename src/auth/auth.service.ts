import {
  Injectable,
  forwardRef,
  Inject,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(
    @Inject(forwardRef(() => UserService))
    private UserService: UserService,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const query = { email: email };
    const user = await this.UserService.findOne(query);
    if (!user) throw new NotFoundException('Email Does not exist');
    const isMatched = await this.comparePasswords(pass, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid Password');
    return user;
  }

  async generateJwtToken(user: any) {
    const payload = {
      email: user.email,
    };

    this.logger.log(`email: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch) => {
        if (isMatch) return true;
        return false;
      })
      .catch((err) => err);
  }
}
