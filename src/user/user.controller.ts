import {
  Controller,
  Post,
  // Request,
  Logger,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('create')
  async create(@Req() req: Request): Promise<any> {
    const newUser = req.body;
    try {
      const query = { email: newUser.email };
      const isUser = await this.userService.findOne(query);
      if (isUser) throw new ConflictException('User Already Exist');
      const user = await this.userService.create(newUser);
      return user;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }
}
